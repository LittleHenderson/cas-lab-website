// Run only in the approved AWS test environment. These definitions are not a test receipt.
import {test, expect} from '@playwright/test';

test('production runtime boots without dynamic evaluation or public editor APIs', async ({page}) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    // The absent optional image sidecar can yield an ordinary 404. Runtime
    // failures have this prefix and must not be hidden by an error boundary.
    if (message.type()==='error' && /\[dc|component|template|React/i.test(message.text())) errors.push(message.text());
  });
  await page.addInitScript(() => {
    window.__policyViolations = [];
    addEventListener('securitypolicyviolation', e => window.__policyViolations.push({directive:e.effectiveDirective,uri:e.blockedURI}));
  });
  await page.goto('/');
  await expect(page.locator('#main')).toBeVisible();
  await expect(page.getByRole('heading', {level:1})).toHaveText('In pursuit of machines that truly learn.');
  await expect(page.locator('.sc-logic-error,.sc-has-error')).toHaveCount(0);
  const state = await page.evaluate(() => ({
    bridges: ['__dcUpdate','__dcSetProps','__dcRegistry','__dcBoot','getDC','CASLabProductionComponent'].filter(key => key in window),
    policy: document.querySelector('meta[http-equiv="Content-Security-Policy"]').content,
    violations: window.__policyViolations
  }));
  expect(state.bridges).toEqual([]);
  expect(state.policy).not.toContain("'unsafe-eval'");
  expect(state.policy).toContain("object-src 'none'");
  expect(state.violations).toEqual([]);
  expect(errors).toEqual([]);
});

test('contact markup remains literal and the generated mail draft remains encoded', async ({page}) => {
  await page.goto('/#contact');
  const payload = '<img src=x onerror="window.__injected=1">';
  await page.locator('#f-name').fill(payload);
  await page.locator('#f-email').fill('security-test@example.invalid');
  await page.locator('#f-org').fill('<script>window.__injected=2</script>');
  await page.locator('#f-type').selectOption('research');
  await page.locator('#f-desc').fill('A test inquiry. ' + payload);
  await page.getByRole('button', {name:'Preview my inquiry'}).click();
  const link = page.getByRole('link', {name:'Open draft in mail app'});
  const href = await link.getAttribute('href');
  expect(href).toMatch(/^mailto:info@caslabai\.com\?subject=/);
  expect(decodeURIComponent(href)).toContain(payload);
  expect(await page.evaluate(() => window.__injected)).toBeUndefined();
  await expect(page.locator('img[onerror], script:not([src]):not([type="text/x-dc"])')).toHaveCount(0);
  // Never click the mail link: this test sends nothing.
});

// Keep a separate budget for each viewport. A software-rendered Cube takes
// about 40 seconds to initialize in AWS; three viewports must not share one
// 120-second test deadline. Assertions are unchanged.
for (const width of [320, 390, 1440]) test(`public routes and logo remain usable at ${width}px`, async ({page}) => {
  test.setTimeout(120000);
    await page.setViewportSize({width,height:900});
    for (const [route,heading] of [['home','In pursuit of machines that truly learn.'],['research','What the lab is investigating and building.'],['project/helmcube','The HELM Cube'],['contact','Tell us about the problem.']]) {
      await page.goto('/#'+route);
      await expect(page.getByRole('heading',{level:1})).toHaveText(heading);
      const brand=page.getByRole('link',{name:'CAS Lab, home'}).first();
      await expect(brand).toBeVisible();
      const mark=await brand.locator(':scope > svg').boundingBox();
      expect(mark.width).toBeCloseTo(width===320?44:52,0);
      if(route==='project/helmcube') {
        const cube=page.frameLocator('iframe[title="HELM Cube light modes, concept render"]');
        await expect(cube.locator('canvas')).toBeVisible();
        const frame=page.frames().find(f=>f.url().includes('helm-cube-3d.html?scene=modes'));
        await frame.waitForFunction(()=>typeof window.__setMode==='function');
        await frame.evaluate(()=>{
          window.__receivedMode=null;
          addEventListener('message',event=>{
            if(event.source===parent && event.origin===location.origin && event.data?.helmMode) window.__receivedMode=event.data.helmMode;
          });
        });
        await page.getByRole('button',{name:'Listening',exact:true}).click();
        await expect.poll(()=>frame.evaluate(()=>window.__receivedMode)).toBe('listening');
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth+1)).toBeTruthy();
    }
    await page.goto('/blog/');
    await expect(page.getByText('No articles published yet.', {exact:true})).toBeVisible();
});

test('theme message gate accepts only the actual same-origin parent', async ({page,baseURL}) => {
  const source=await (await page.request.get('/')).text();
  const fixture=new URL('/security-canvas-fixture.html',baseURL).href;
  const host=new URL('/security-canvas-host.html',baseURL).href;
  await page.route(fixture,route=>route.fulfill({contentType:'text/html',body:source.replace('<helmet>','<helmet><meta name="design_doc_mode" content="canvas">')}));
  await page.route(host,route=>route.fulfill({contentType:'text/html',body:`<!doctype html><iframe src="${fixture}"></iframe>`}));
  await page.goto(host);
  const frame=page.frames().find(f=>f.url()===fixture);
  // Playwright's text matcher deliberately excludes style contents. Read the
  // stylesheet's actual textContent so this verifies the active theme rule.
  const themeCss=()=>frame.locator('style[data-dc-canvas]').textContent();
  await expect.poll(themeCss).toContain('#f0eee6');
  await page.evaluate(()=>document.querySelector('iframe').contentWindow.postMessage({type:'__dc_theme',theme:'dark'},location.origin));
  await expect.poll(themeCss).toContain('#2e2c26');
  await frame.evaluate(() => {
    dispatchEvent(new MessageEvent('message',{source:parent,origin:'https://untrusted.invalid',data:{type:'__dc_theme',theme:'light'}}));
    dispatchEvent(new MessageEvent('message',{source:window,origin:location.origin,data:{type:'__dc_theme',theme:'light'}}));
  });
  await expect.poll(themeCss).toContain('#2e2c26');
  await page.evaluate(()=>document.querySelector('iframe').contentWindow.postMessage({type:'__dc_theme',theme:'light'},location.origin));
  await expect.poll(themeCss).toContain('#f0eee6');
});

test('known lesson IDs and edited fields cannot inject teaching markup', async ({page}) => {
  await page.goto('/compiler/');
  const result = await page.evaluate(async () => {
    const {createLessonTeaching} = await import('/compiler/lesson-teaching.js');
    const {LESSON_CONTEXTS} = await import('/compiler/lesson-data.js');
    const container = document.createElement('div'); document.body.append(container);
    const view = createLessonTeaching({container,onLoadLesson:async()=>{}});
    const unknown = '<img src=x onerror="window.__injected=4">';
    view.update({lessonId:unknown,pristine:true,changedFields:[]});
    const rejected = container.hidden && !container.childNodes.length;
    const known = LESSON_CONTEXTS[0].id;
    const states=[];
    for (const pristine of [true,false]) {
      view.update({lessonId:known,pristine,changedFields:['__proto__',unknown,'source']});
      states.push({visible:!container.hidden,injected:!!container.querySelector('[onerror],script,img')});
    }
    view.destroy(); container.remove();
    return {rejected,states,executed:window.__injected};
  });
  expect(result).toEqual({rejected:true,states:[{visible:true,injected:false},{visible:true,injected:false}],executed:undefined});
});
