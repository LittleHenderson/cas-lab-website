/* Reviewed fictional professional examples. Runtime and content checks are in checks/. */
export const PROFESSIONAL_EXAMPLES = Object.freeze([
  {
    "id": "professional-psychology-avoidance-and-relief",
    "name": "What does the feedback arrow assume? — original",
    "category": "Professional: Psychology",
    "source": "^3^E_{F4}|f <-> ^2^E_{F4}|f",
    "description": "Make the difference between an authored feedback hypothesis and a one-way dependency visible. Only the relation token changes: <-> to ->. All eight state-component occurrences remain identical.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-psychology-avoidance-and-relief-variation",
    "name": "What does the feedback arrow assume? — variation",
    "category": "Professional: Psychology",
    "source": "^3^E_{F4}|f -> ^2^E_{F4}|f",
    "description": "Make the difference between an authored feedback hypothesis and a one-way dependency visible. Only the relation token changes: <-> to ->. All eight state-component occurrences remain identical.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-psychology-checking-and-uncertainty",
    "name": "Repeated thought or attention? — original",
    "category": "Professional: Psychology",
    "source": "^7^C_{F6}|A",
    "description": "Require explicit narrative evidence for Rhythm, and see what changes when that evidence is absent. Only Noetic ^7 Rhythm changes to ^1 Mind. Cognitive domain, F6 Structure and Analytical register are unchanged.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-psychology-checking-and-uncertainty-variation",
    "name": "Repeated thought or attention? — variation",
    "category": "Professional: Psychology",
    "source": "^1^C_{F6}|A",
    "description": "Require explicit narrative evidence for Rhythm, and see what changes when that evidence is absent. Only Noetic ^7 Rhythm changes to ^1 Mind. Cognitive domain, F6 Structure and Analytical register are unchanged.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-psychology-planning-and-starting",
    "name": "Wanting connection and beginning an action — original",
    "category": "Professional: Psychology",
    "source": "^2^C_{F4}|A",
    "description": "Keep a desired plan separate from an observed first action, and preserve the shared motive. The entire original state remains unchanged as the source. The edit adds a dependency arrow and a new target: ^1 Mind, ^O Operational, F4 Connection, |E Embodied. It is not a one-token change.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-psychology-planning-and-starting-variation",
    "name": "Wanting connection and beginning an action — variation",
    "category": "Professional: Psychology",
    "source": "^2^C_{F4}|A -> ^1^O_{F4}|E",
    "description": "Keep a desired plan separate from an observed first action, and preserve the shared motive. The entire original state remains unchanged as the source. The edit adds a dependency arrow and a new target: ^1 Mind, ^O Operational, F4 Connection, |E Embodied. It is not a one-token change.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-ai-evidence-review",
    "name": "Inspect the evidence and the claim",
    "category": "Professional: AI",
    "source": "^6^C_{F2}|A",
    "description": "Designing an evaluation case that distinguishes source support from an answer that merely came to mind. Change only ^6 to ^9. The original names decomposing the claim; the variation names the proposal that a prompt or passage brought to mind. The change does not make the proposal true.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-ai-evidence-review-variation",
    "name": "Identify the proposal that was surfaced",
    "category": "Professional: AI",
    "source": "^9^C_{F2}|A",
    "description": "Designing an evaluation case that distinguishes source support from an answer that merely came to mind. Change only ^6 to ^9. The original names decomposing the claim; the variation names the proposal that a prompt or passage brought to mind. The change does not make the proposal true.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-incident-assumptions",
    "name": "Make the inherited explanation visible",
    "category": "Professional: Software",
    "source": "^5^C_{F6}|A",
    "description": "Writing an incident investigation that separates prior beliefs, observations, hypotheses, and tests. Change ^5 to ^6 while retaining ^C, F6, and |A. The selected role changes from the team's accumulated working assumptions to examining the parts of one explanation.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-incident-assumptions-variation",
    "name": "Examine the explanation against a test",
    "category": "Professional: Software",
    "source": "^6^C_{F6}|A",
    "description": "Writing an incident investigation that separates prior beliefs, observations, hypotheses, and tests. Change ^5 to ^6 while retaining ^C, F6, and |A. The selected role changes from the team's accumulated working assumptions to examining the parts of one explanation.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-requirements-tradeoff",
    "name": "Decompose the requirement and its trace",
    "category": "Professional: Systems",
    "source": "^6^C_{F6}|A",
    "description": "Preparing a design review that separates requirement structure from an evaluation of a candidate design. Change ^C to ^E and F6 to F7, keeping ^6 and |A. The operation still examines constituent ideas, but its declared setting becomes evaluation and its motive becomes mission purpose.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-requirements-tradeoff-variation",
    "name": "Evaluate the parts against mission purpose",
    "category": "Professional: Systems",
    "source": "^6^E_{F7}|A",
    "description": "Preparing a design review that separates requirement structure from an evaluation of a candidate design. Change ^C to ^E and F6 to F7, keeping ^6 and |A. The operation still examines constituent ideas, but its declared setting becomes evaluation and its motive becomes mission purpose.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-pipeline-propagation",
    "name": "Select the triggering role",
    "category": "Professional: Systems",
    "source": "^8^C_{F5}|A",
    "description": "Checking the consequences of declared gain, cutoff, and saturation assumptions in a small model. Change ^8 to ^9 while retaining ^C, F5, and |A. The selected state changes from a trigger role to a triggered idea. To change the numeric model, edit the separate CCDL saturation parameter.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-pipeline-propagation-variation",
    "name": "Select the resulting idea",
    "category": "Professional: Systems",
    "source": "^9^C_{F5}|A",
    "description": "Checking the consequences of declared gain, cutoff, and saturation assumptions in a small model. Change ^8 to ^9 while retaining ^C, F5, and |A. The selected state changes from a trigger role to a triggered idea. To change the numeric model, edit the separate CCDL saturation parameter.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-workflow-resources",
    "name": "Attend to the handoff problem",
    "category": "Professional: Human factors",
    "source": "^1^C_{F6}|A",
    "description": "Reviewing a coordination process and making an uncalibrated resource model explicit. Change ^1^C to ^7^O while retaining F6 and |A. The selected state moves from awareness of the workflow to a repeated, explicitly organized operational routine.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-workflow-resources-variation",
    "name": "Specify the repeated handoff routine",
    "category": "Professional: Human factors",
    "source": "^7^O_{F6}|A",
    "description": "Reviewing a coordination process and making an uncalibrated resource model explicit. Change ^1^C to ^7^O while retaining F6 and |A. The selected state moves from awareness of the workflow to a repeated, explicitly organized operational routine.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-learning-transfer",
    "name": "Unpack the worked packet trace",
    "category": "Professional: Education",
    "source": "^6^C_{F2}|A",
    "description": "Designing instruction that connects an explicit explanation with a concrete practice activity. Change ^6^C to ^7^O and |A to |E, keeping F2. The selected state changes from analytical decomposition to repeated concrete practice; both are authored ways to pursue understanding.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-learning-transfer-variation",
    "name": "Practice with a changed packet trace",
    "category": "Professional: Education",
    "source": "^7^O_{F2}|E",
    "description": "Designing instruction that connects an explicit explanation with a concrete practice activity. Change ^6^C to ^7^O and |A to |E, keeping F2. The selected state changes from analytical decomposition to repeated concrete practice; both are authored ways to pursue understanding.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-ai-evidence-review-exercise",
    "name": "Agent proposal and review map",
    "category": "Professional: AI",
    "source": "board proposal_map {\n  node prompt: ^8^C_{F2}|A;\n  node policy: ^5^P_{F7}|T;\n  node proposal: ^9^C_{F5}|A;\n  cjt propose: CJT<prompt | policy => proposal> [beta=1, sat=1, cutoff=0.1];\n  probe candidate: proposal;\n}",
    "description": "Declare named proposal and review roles before implementing any AI workflow. The output is a static graph, not evidence retrieval or an executing agent.",
    "language": "ccdl",
    "mode": "check"
  },
  {
    "id": "professional-ai-evidence-review-exercise-variation",
    "name": "Agent proposal and review map — changed assumption",
    "category": "Professional: AI",
    "source": "board proposal_map {\n  node prompt: ^8^C_{F2}|A;\n  node policy: ^5^P_{F7}|T;\n  node proposal: ^9^C_{F5}|A;\n  node reviewed_candidate: ^9^E_{F6}|A;\n  cjt propose: CJT<prompt | policy => proposal> [beta=1, sat=1, cutoff=0.1];\n  cjt review_gate: CJT<proposal | policy => reviewed_candidate> [beta=1, sat=1, cutoff=0.1];\n  probe candidate: reviewed_candidate;\n}",
    "description": "Declare named proposal and review roles before implementing any AI workflow. The output is a static graph, not evidence retrieval or an executing agent.",
    "language": "ccdl",
    "mode": "check"
  },
  {
    "id": "professional-incident-assumptions-exercise",
    "name": "Incident investigation relation map",
    "category": "Professional: Software",
    "source": "let assumptions = ^5^C_{F6}|A;\nlet hypothesis_review = ^6^C_{F6}|A;\nlet test_activity = ^7^O_{F2}|E;\nRelationCluster{assumptions -> hypothesis_review, hypothesis_review -> test_activity}",
    "description": "Represent a proposed investigation plan and make the test criteria explicit before operational testing. Directed relations express the author's plan; they do not execute a test or reconstruct a timeline.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-incident-assumptions-exercise-variation",
    "name": "Incident investigation relation map — changed assumption",
    "category": "Professional: Software",
    "source": "let assumptions = ^5^C_{F6}|A;\nlet hypothesis_review = ^6^C_{F6}|A;\nlet test_activity = ^7^O_{F2}|E;\nlet test_criteria = ^6^E_{F6}|A;\nRelationCluster{assumptions -> hypothesis_review, hypothesis_review -> test_criteria, test_criteria -> test_activity}",
    "description": "Represent a proposed investigation plan and make the test criteria explicit before operational testing. Directed relations express the author's plan; they do not execute a test or reconstruct a timeline.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-requirements-tradeoff-exercise",
    "name": "Find an omitted review perspective",
    "category": "Professional: Systems",
    "source": "let required = StateVariantSet{^6^C_{F6}|A, ^6^E_{F7}|A, ^7^O_{F6}|A};\nlet represented = StateVariantSet{^6^C_{F6}|A, ^6^E_{F7}|A};\nlet missing = required setminus represented;\nTuple{missing, |missing|}",
    "description": "Use exact finite set difference to find a CAS perspective omitted from a declared review plan. This checks the supplied symbolic set, not the real requirements.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-requirements-tradeoff-exercise-variation",
    "name": "Find an omitted review perspective — changed assumption",
    "category": "Professional: Systems",
    "source": "let required = StateVariantSet{^6^C_{F6}|A, ^6^E_{F7}|A, ^7^O_{F6}|A};\nlet represented = StateVariantSet{^6^C_{F6}|A, ^6^E_{F7}|A, ^7^O_{F6}|A};\nlet missing = required setminus represented;\nTuple{missing, |missing|}",
    "description": "Use exact finite set difference to find a CAS perspective omitted from a declared review plan. This checks the supplied symbolic set, not the real requirements.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-pipeline-propagation-exercise",
    "name": "Two-stage fixed-bias simulation",
    "category": "Professional: Systems",
    "source": "board pipeline_model {\n  input: stimulus;\n  output: answer;\n  node cause: ^8^C_{F5}|A;\n  node bias: ^5^P_{F7}|T;\n  node middle: ^9^C_{F5}|A;\n  node effect: ^9^C_{F5}|A;\n  cjt second_stage: CJT<middle | bias => effect> [beta=0.5, sat=0.9, cutoff=0.1];\n  cjt first_stage: CJT<cause | bias => middle> [beta=2, sat=0.75, cutoff=0.1];\n  probe observed: effect;\n}",
    "description": "Compute a four-tick scalar trace under the supported fixed-bias profile. Compare a first-stage saturation assumption of 0.75 with 0.50.",
    "language": "ccdl",
    "mode": "simulate",
    "inputs": "{\n  \"profile\": \"cas.pcba.scalar-fixed-bias/0.1\",\n  \"input_bindings\": {\n    \"stimulus\": \"cause\"\n  },\n  \"output_bindings\": {\n    \"answer\": \"effect\"\n  },\n  \"initial_state\": {\n    \"tick\": 0,\n    \"nodes\": {\n      \"cause\": \"0\",\n      \"bias\": \"0.5\",\n      \"middle\": \"0\",\n      \"effect\": \"0\"\n    }\n  },\n  \"schedule\": [\n    {\n      \"stimulus\": \"0.1\"\n    },\n    {\n      \"stimulus\": \"0.5\"\n    },\n    {\n      \"stimulus\": \"0\"\n    },\n    {\n      \"stimulus\": \"0.375\"\n    }\n  ]\n}",
    "steps": 4
  },
  {
    "id": "professional-pipeline-propagation-exercise-variation",
    "name": "Two-stage fixed-bias simulation — changed assumption",
    "category": "Professional: Systems",
    "source": "board pipeline_model {\n  input: stimulus;\n  output: answer;\n  node cause: ^8^C_{F5}|A;\n  node bias: ^5^P_{F7}|T;\n  node middle: ^9^C_{F5}|A;\n  node effect: ^9^C_{F5}|A;\n  cjt second_stage: CJT<middle | bias => effect> [beta=0.5, sat=0.9, cutoff=0.1];\n  cjt first_stage: CJT<cause | bias => middle> [beta=2, sat=0.50, cutoff=0.1];\n  probe observed: effect;\n}",
    "description": "Compute a four-tick scalar trace under the supported fixed-bias profile. Compare a first-stage saturation assumption of 0.75 with 0.50.",
    "language": "ccdl",
    "mode": "simulate",
    "inputs": "{\n  \"profile\": \"cas.pcba.scalar-fixed-bias/0.1\",\n  \"input_bindings\": {\n    \"stimulus\": \"cause\"\n  },\n  \"output_bindings\": {\n    \"answer\": \"effect\"\n  },\n  \"initial_state\": {\n    \"tick\": 0,\n    \"nodes\": {\n      \"cause\": \"0\",\n      \"bias\": \"0.5\",\n      \"middle\": \"0\",\n      \"effect\": \"0\"\n    }\n  },\n  \"schedule\": [\n    {\n      \"stimulus\": \"0.1\"\n    },\n    {\n      \"stimulus\": \"0.5\"\n    },\n    {\n      \"stimulus\": \"0\"\n    },\n    {\n      \"stimulus\": \"0.375\"\n    }\n  ]\n}",
    "steps": 4
  },
  {
    "id": "professional-workflow-resources-exercise",
    "name": "CAS Ohm design-score comparison",
    "category": "Professional: Human factors",
    "source": "let scale = ohm_scale(\"handoff-design-v1\", \"declared-drive\", \"declared-attention\");\nlet potential = ohm_drive(\"12\", scale, \"design\", \"example:handoff-drive-assumption\");\nlet resistance = ohm_constraint(\"4\", scale, \"design\", \"example:handoff-constraint-assumption\");\nohm_flow(potential, resistance)",
    "description": "Calculate a declared drive-to-constraint ratio with explicit units, provenance, and unverified calibration. Compare constraint 4 with 3.",
    "language": "cas",
    "mode": "run"
  },
  {
    "id": "professional-workflow-resources-exercise-variation",
    "name": "CAS Ohm design-score comparison — changed assumption",
    "category": "Professional: Human factors",
    "source": "let scale = ohm_scale(\"handoff-design-v1\", \"declared-drive\", \"declared-attention\");\nlet potential = ohm_drive(\"12\", scale, \"design\", \"example:handoff-drive-assumption\");\nlet resistance = ohm_constraint(\"3\", scale, \"design\", \"example:handoff-constraint-assumption\");\nohm_flow(potential, resistance)",
    "description": "Calculate a declared drive-to-constraint ratio with explicit units, provenance, and unverified calibration. Compare constraint 4 with 3.",
    "language": "cas",
    "mode": "run"
  }
]);
export const PROFESSIONAL_LESSONS = Object.freeze([
  {
    "id": "professional-psychology-avoidance-and-relief",
    "pairId": "professional-psychology-avoidance-and-relief",
    "variant": "original",
    "title": "What does the feedback arrow assume?",
    "kind": "mapped-program",
    "source": "^3^E_{F4}|f <-> ^2^E_{F4}|f",
    "context": "Make the difference between an authored feedback hypothesis and a one-way dependency visible.",
    "story": "Rina, 32, has stopped volunteering to speak in her team's meetings after a colleague mocked a presentation. She wants to stay connected with the team. She weighs speaking against staying silent by how safe and accepted each feels. She feels repelled by the prospect of speaking and drawn toward the brief relief of staying silent. She experiences both as feelings. She notices that silence leaves her with fewer chances to learn whether the team is supportive. For this exercise, the author proposes that aversion and relief-seeking reinforce each other.",
    "mappings": [
      {
        "key": "source-operator",
        "token": "^3",
        "phrase": "repelled by the prospect of speaking",
        "name": "Source operator",
        "explanation": "Negative: the stated aversion, not a judgment that Rina is a negative person.",
        "color": "cyan",
        "start": 0,
        "end": 2
      },
      {
        "key": "source-domain",
        "token": "^E",
        "phrase": "weighs speaking against staying silent",
        "name": "Source domain",
        "explanation": "Evaluative domain: her appraisal of the alternatives.",
        "color": "emerald",
        "start": 2,
        "end": 4
      },
      {
        "key": "source-drive",
        "token": "_{F4}",
        "phrase": "wants to stay connected with the team",
        "name": "Source drive",
        "explanation": "Connection is the explicitly stated motive.",
        "color": "amber",
        "start": 4,
        "end": 9
      },
      {
        "key": "source-register",
        "token": "|f",
        "phrase": "experiences both as feelings",
        "name": "Source register",
        "explanation": "Affective register; lowercase f is intentional.",
        "color": "pink",
        "start": 9,
        "end": 11
      },
      {
        "key": "target-operator",
        "token": "^2",
        "phrase": "drawn toward the brief relief of staying silent",
        "name": "Target operator",
        "explanation": "Positive: attraction to the idea of relief, not clinical benefit or moral goodness.",
        "color": "cyan",
        "start": 16,
        "end": 18
      },
      {
        "key": "target-domain",
        "token": "^E",
        "phrase": "weighs speaking against staying silent",
        "name": "Target domain",
        "explanation": "The same evaluative domain is retained.",
        "color": "emerald",
        "start": 18,
        "end": 20
      },
      {
        "key": "target-drive",
        "token": "_{F4}",
        "phrase": "wants to stay connected with the team",
        "name": "Target drive",
        "explanation": "The same stated Connection motive is retained.",
        "color": "amber",
        "start": 20,
        "end": 25
      },
      {
        "key": "target-register",
        "token": "|f",
        "phrase": "experiences both as feelings",
        "name": "Target register",
        "explanation": "The same Affective register is retained.",
        "color": "pink",
        "start": 25,
        "end": 27
      },
      {
        "key": "relation-relation",
        "token": "<->",
        "phrase": "the author proposes that aversion and relief-seeking reinforce each other",
        "name": "Relation relation",
        "explanation": "An explicit two-way model assumption, not a measured feedback process.",
        "color": "cyan",
        "start": 12,
        "end": 15
      }
    ],
    "changes": "Only the relation token changes: <-> to ->. All eight state-component occurrences remain identical.",
    "question": "What evidence would justify adding the reverse link?",
    "professional": {
      "field": "Psychology / DSM context",
      "use": "In supervision or a fictional formulation exercise, distinguish the person's report from the author's causal assumptions. Ask what observations could support or weaken the reverse link.",
      "task": [
        "Make the difference between an authored feedback hypothesis and a one-way dependency visible.",
        "What evidence would justify adding the reverse link?"
      ],
      "expectedOutput": [
        "Relation changes from bidirectional to dependency; source E3 and target E2 retain F4 and Affective register.",
        "Selected version returns {\"kind\": \"relation\", \"relation\": \"bidirectional\", \"admissible\": true, \"domain_descent_ok\": true, \"source\": {\"kind\": \"state\", \"states\": {\"23\": 1}, \"dominant_state\": \"E3\", \"dominant_operator\": \"CO-3\", \"dominant_domain\": \"E\", \"dominant_drive\": \"F4\", \"register\": \"f\", \"register_name\": \"Affective\"}, \"target\": {\"kind\": \"state\", \"states\": {\"22\": 1}, \"dominant_state\": \"E2\", \"dominant_operator\": \"CO-2\", \"dominant_domain\": \"E\", \"dominant_drive\": \"F4\", \"register\": \"f\", \"register_name\": \"Affective\"}}.",
        "Every listed states weight 1 is the compiler's representation of one supplied literal, not 100% confidence, prevalence, severity or treatment response. 'admissible' and 'domain_descent_ok' are compiler checks only. Expected objects are result projections, not complete artifacts. Graph geometry and renderer layout are not asserted."
      ],
      "limits": [
        "CAS checks and represents the notation supplied by an author. It does not diagnose a person, measure symptoms, establish causation, or validate a treatment. The examples are educational formulations, not assessment instruments.",
        "This code models two selected idea states; it does not encode the whole avoidance behavior or its frequency.",
        "The bidirectional result does not simulate time, prove reinforcement or calculate clinical risk.",
        "Positive does not mean beneficial; Negative does not label the person.",
        "No diagnosis or treatment recommendation follows from compiler validity.",
        "Alternative explanations to consider: An actually hostile or humiliating workplace; A reasonable preference to avoid a particular colleague; A new communication task or temporary stress; the short vignette cannot settle these"
      ],
      "clinicalBackground": "Avoiding a feared social situation can bring short-term relief while anxiety persists. A clinician considers context and impact; this vignette does not establish social anxiety disorder.",
      "sources": [
        {
          "title": "APA: DSM-5-TR frequently asked questions",
          "url": "https://www.psychiatry.org/psychiatrists/practice/dsm/frequently-asked-questions"
        },
        {
          "title": "NIMH: Social Anxiety Disorder—What You Need to Know",
          "url": "https://www.nimh.nih.gov/health/publications/social-anxiety-disorder-more-than-just-shyness"
        }
      ]
    }
  },
  {
    "id": "professional-psychology-avoidance-and-relief-variation",
    "pairId": "professional-psychology-avoidance-and-relief",
    "variant": "variation",
    "title": "What does the feedback arrow assume?",
    "kind": "mapped-program",
    "source": "^3^E_{F4}|f -> ^2^E_{F4}|f",
    "context": "Make the difference between an authored feedback hypothesis and a one-way dependency visible.",
    "story": "Rina, 32, has stopped volunteering to speak in her team's meetings after a colleague mocked a presentation. She wants to stay connected with the team. She weighs speaking against staying silent by how safe and accepted each feels. She feels repelled by the prospect of speaking and drawn toward the brief relief of staying silent. She experiences both as feelings. She notices that silence leaves her with fewer chances to learn whether the team is supportive. For this exercise, the author proposes that aversion leads to relief-seeking, without a reverse link.",
    "mappings": [
      {
        "key": "source-operator",
        "token": "^3",
        "phrase": "repelled by the prospect of speaking",
        "name": "Source operator",
        "explanation": "Negative: the stated aversion, not a judgment that Rina is a negative person.",
        "color": "cyan",
        "start": 0,
        "end": 2
      },
      {
        "key": "source-domain",
        "token": "^E",
        "phrase": "weighs speaking against staying silent",
        "name": "Source domain",
        "explanation": "Evaluative domain: her appraisal of the alternatives.",
        "color": "emerald",
        "start": 2,
        "end": 4
      },
      {
        "key": "source-drive",
        "token": "_{F4}",
        "phrase": "wants to stay connected with the team",
        "name": "Source drive",
        "explanation": "Connection is the explicitly stated motive.",
        "color": "amber",
        "start": 4,
        "end": 9
      },
      {
        "key": "source-register",
        "token": "|f",
        "phrase": "experiences both as feelings",
        "name": "Source register",
        "explanation": "Affective register; lowercase f is intentional.",
        "color": "pink",
        "start": 9,
        "end": 11
      },
      {
        "key": "target-operator",
        "token": "^2",
        "phrase": "drawn toward the brief relief of staying silent",
        "name": "Target operator",
        "explanation": "Positive: attraction to the idea of relief, not clinical benefit or moral goodness.",
        "color": "cyan",
        "start": 15,
        "end": 17
      },
      {
        "key": "target-domain",
        "token": "^E",
        "phrase": "weighs speaking against staying silent",
        "name": "Target domain",
        "explanation": "The same evaluative domain is retained.",
        "color": "emerald",
        "start": 17,
        "end": 19
      },
      {
        "key": "target-drive",
        "token": "_{F4}",
        "phrase": "wants to stay connected with the team",
        "name": "Target drive",
        "explanation": "The same stated Connection motive is retained.",
        "color": "amber",
        "start": 19,
        "end": 24
      },
      {
        "key": "target-register",
        "token": "|f",
        "phrase": "experiences both as feelings",
        "name": "Target register",
        "explanation": "The same Affective register is retained.",
        "color": "pink",
        "start": 24,
        "end": 26
      },
      {
        "key": "relation-relation",
        "token": "->",
        "phrase": "the author proposes that aversion leads to relief-seeking, without a reverse link",
        "name": "Relation relation",
        "explanation": "An authored dependency in one direction; chronology alone would not prove it.",
        "color": "cyan",
        "start": 12,
        "end": 14
      }
    ],
    "changes": "Only the relation token changes: <-> to ->. All eight state-component occurrences remain identical.",
    "question": "What evidence would justify adding the reverse link?",
    "professional": {
      "field": "Psychology / DSM context",
      "use": "In supervision or a fictional formulation exercise, distinguish the person's report from the author's causal assumptions. Ask what observations could support or weaken the reverse link.",
      "task": [
        "Make the difference between an authored feedback hypothesis and a one-way dependency visible.",
        "What evidence would justify adding the reverse link?"
      ],
      "expectedOutput": [
        "Relation changes from bidirectional to dependency; source E3 and target E2 retain F4 and Affective register.",
        "Selected version returns {\"kind\": \"relation\", \"relation\": \"dependency\", \"admissible\": true, \"domain_descent_ok\": true, \"source\": {\"kind\": \"state\", \"states\": {\"23\": 1}, \"dominant_state\": \"E3\", \"dominant_operator\": \"CO-3\", \"dominant_domain\": \"E\", \"dominant_drive\": \"F4\", \"register\": \"f\", \"register_name\": \"Affective\"}, \"target\": {\"kind\": \"state\", \"states\": {\"22\": 1}, \"dominant_state\": \"E2\", \"dominant_operator\": \"CO-2\", \"dominant_domain\": \"E\", \"dominant_drive\": \"F4\", \"register\": \"f\", \"register_name\": \"Affective\"}}.",
        "Every listed states weight 1 is the compiler's representation of one supplied literal, not 100% confidence, prevalence, severity or treatment response. 'admissible' and 'domain_descent_ok' are compiler checks only. Expected objects are result projections, not complete artifacts. Graph geometry and renderer layout are not asserted."
      ],
      "limits": [
        "CAS checks and represents the notation supplied by an author. It does not diagnose a person, measure symptoms, establish causation, or validate a treatment. The examples are educational formulations, not assessment instruments.",
        "This code models two selected idea states; it does not encode the whole avoidance behavior or its frequency.",
        "The bidirectional result does not simulate time, prove reinforcement or calculate clinical risk.",
        "Positive does not mean beneficial; Negative does not label the person.",
        "No diagnosis or treatment recommendation follows from compiler validity.",
        "Alternative explanations to consider: An actually hostile or humiliating workplace; A reasonable preference to avoid a particular colleague; A new communication task or temporary stress; the short vignette cannot settle these"
      ],
      "clinicalBackground": "Avoiding a feared social situation can bring short-term relief while anxiety persists. A clinician considers context and impact; this vignette does not establish social anxiety disorder.",
      "sources": [
        {
          "title": "APA: DSM-5-TR frequently asked questions",
          "url": "https://www.psychiatry.org/psychiatrists/practice/dsm/frequently-asked-questions"
        },
        {
          "title": "NIMH: Social Anxiety Disorder—What You Need to Know",
          "url": "https://www.nimh.nih.gov/health/publications/social-anxiety-disorder-more-than-just-shyness"
        }
      ]
    }
  },
  {
    "id": "professional-psychology-checking-and-uncertainty",
    "pairId": "professional-psychology-checking-and-uncertainty",
    "variant": "original",
    "title": "Repeated thought or attention?",
    "kind": "mapped-program",
    "source": "^7^C_{F6}|A",
    "context": "Require explicit narrative evidence for Rhythm, and see what changes when that evidence is absent.",
    "story": "Jordan, 41, has recently moved into a flat with a stiff door latch. Before leaving for work, an unwanted doubt about the door returns. Jordan says, 'My mind repeatedly replays whether the latch closed.' Jordan compares remembered sounds and sensations to decide what happened, seeking a reliable, predictable leaving-home routine. Returning to the door brings brief relief, but the doubt returns and Jordan arrives late.",
    "mappings": [
      {
        "key": "state-operator",
        "token": "^7",
        "phrase": "My mind repeatedly replays whether the latch closed",
        "name": "State operator",
        "explanation": "Rhythm maps the stated pattern of exposure to the idea, not an OCD diagnosis or the number of physical checks.",
        "color": "cyan",
        "start": 0,
        "end": 2
      },
      {
        "key": "state-domain",
        "token": "^C",
        "phrase": "whether the latch closed",
        "name": "State domain",
        "explanation": "Cognitive domain: the thought being processed.",
        "color": "emerald",
        "start": 2,
        "end": 4
      },
      {
        "key": "state-drive",
        "token": "_{F6}",
        "phrase": "seeking a reliable, predictable leaving-home routine",
        "name": "State drive",
        "explanation": "Structure is an author-assigned interpretation grounded in this stated goal.",
        "color": "amber",
        "start": 4,
        "end": 9
      },
      {
        "key": "state-register",
        "token": "|A",
        "phrase": "compares remembered sounds and sensations to decide what happened",
        "name": "State register",
        "explanation": "Analytical register: comparison/reasoning, not a guarantee of accuracy.",
        "color": "pink",
        "start": 9,
        "end": 11
      }
    ],
    "changes": "Only Noetic ^7 Rhythm changes to ^1 Mind. Cognitive domain, F6 Structure and Analytical register are unchanged.",
    "question": "Which exact words justify Rhythm rather than attention alone?",
    "professional": {
      "field": "Psychology / DSM context",
      "use": "Practice documenting the reported thought pattern without treating repeated behavior as a diagnostic shortcut. Ask about latch reliability, interruptions, time cost, distress and impact.",
      "task": [
        "Require explicit narrative evidence for Rhythm, and see what changes when that evidence is absent.",
        "Which exact words justify Rhythm rather than attention alone?"
      ],
      "expectedOutput": [
        "C7 / CO-7 becomes C1 / CO-1; F6 and Analytical register stay the same.",
        "Selected version returns {\"kind\": \"state\", \"states\": {\"17\": 1}, \"dominant_state\": \"C7\", \"dominant_operator\": \"CO-7\", \"dominant_domain\": \"C\", \"dominant_drive\": \"F6\", \"register\": \"A\", \"register_name\": \"Analytical\"}.",
        "Every listed states weight 1 is the compiler's representation of one supplied literal, not 100% confidence, prevalence, severity or treatment response. 'admissible' and 'domain_descent_ok' are compiler checks only. Expected objects are result projections, not complete artifacts. Graph geometry and renderer layout are not asserted."
      ],
      "limits": [
        "CAS checks and represents the notation supplied by an author. It does not diagnose a person, measure symptoms, establish causation, or validate a treatment. The examples are educational formulations, not assessment instruments.",
        "The CAS expression encodes a selected cognitive pattern, not all physical checking.",
        "^7 is not an OCD marker; ^1 is not a recovery marker.",
        "The comparison is a different fictional account, not an instruction to stop safety checks or a therapy exercise.",
        "F6 and |A are author interpretations, not measured personality or cognitive-test scores.",
        "Alternative explanations to consider: A genuinely unreliable door latch; Distraction or interruptions during leaving-home tasks; A situational safety concern; a clinician would assess broader patterns rather than infer a disorder from this scene"
      ],
      "clinicalBackground": "OCD can involve unwanted thoughts and repeated checking with temporary relief. Checking itself does not establish OCD; distress, interference, history and other explanations need assessment.",
      "sources": [
        {
          "title": "APA: DSM-5-TR frequently asked questions",
          "url": "https://www.psychiatry.org/psychiatrists/practice/dsm/frequently-asked-questions"
        },
        {
          "title": "NIMH: Obsessive-Compulsive Disorder—When Unwanted Thoughts or Repetitive Behaviors Take Over",
          "url": "https://www.nimh.nih.gov/health/publications/obsessive-compulsive-disorder-when-unwanted-thoughts-or-repetitive-behaviors-take-over"
        }
      ]
    }
  },
  {
    "id": "professional-psychology-checking-and-uncertainty-variation",
    "pairId": "professional-psychology-checking-and-uncertainty",
    "variant": "variation",
    "title": "Repeated thought or attention?",
    "kind": "mapped-program",
    "source": "^1^C_{F6}|A",
    "context": "Require explicit narrative evidence for Rhythm, and see what changes when that evidence is absent.",
    "story": "On a different morning, Jordan, 41, says, 'My attention is on whether the latch closed.' Jordan compares remembered sounds and sensations to decide what happened, seeking a reliable, predictable leaving-home routine. This account describes attention without saying that the thought repeats.",
    "mappings": [
      {
        "key": "state-operator",
        "token": "^1",
        "phrase": "My attention is on whether the latch closed",
        "name": "State operator",
        "explanation": "Mind: the stated attention to an idea; not a claim that one check proves health.",
        "color": "cyan",
        "start": 0,
        "end": 2
      },
      {
        "key": "state-domain",
        "token": "^C",
        "phrase": "whether the latch closed",
        "name": "State domain",
        "explanation": "Cognitive domain: the thought being processed.",
        "color": "emerald",
        "start": 2,
        "end": 4
      },
      {
        "key": "state-drive",
        "token": "_{F6}",
        "phrase": "seeking a reliable, predictable leaving-home routine",
        "name": "State drive",
        "explanation": "Structure is an author-assigned interpretation grounded in this stated goal.",
        "color": "amber",
        "start": 4,
        "end": 9
      },
      {
        "key": "state-register",
        "token": "|A",
        "phrase": "compares remembered sounds and sensations to decide what happened",
        "name": "State register",
        "explanation": "Analytical register: comparison/reasoning, not a guarantee of accuracy.",
        "color": "pink",
        "start": 9,
        "end": 11
      }
    ],
    "changes": "Only Noetic ^7 Rhythm changes to ^1 Mind. Cognitive domain, F6 Structure and Analytical register are unchanged.",
    "question": "Which exact words justify Rhythm rather than attention alone?",
    "professional": {
      "field": "Psychology / DSM context",
      "use": "Practice documenting the reported thought pattern without treating repeated behavior as a diagnostic shortcut. Ask about latch reliability, interruptions, time cost, distress and impact.",
      "task": [
        "Require explicit narrative evidence for Rhythm, and see what changes when that evidence is absent.",
        "Which exact words justify Rhythm rather than attention alone?"
      ],
      "expectedOutput": [
        "C7 / CO-7 becomes C1 / CO-1; F6 and Analytical register stay the same.",
        "Selected version returns {\"kind\": \"state\", \"states\": {\"11\": 1}, \"dominant_state\": \"C1\", \"dominant_operator\": \"CO-1\", \"dominant_domain\": \"C\", \"dominant_drive\": \"F6\", \"register\": \"A\", \"register_name\": \"Analytical\"}.",
        "Every listed states weight 1 is the compiler's representation of one supplied literal, not 100% confidence, prevalence, severity or treatment response. 'admissible' and 'domain_descent_ok' are compiler checks only. Expected objects are result projections, not complete artifacts. Graph geometry and renderer layout are not asserted."
      ],
      "limits": [
        "CAS checks and represents the notation supplied by an author. It does not diagnose a person, measure symptoms, establish causation, or validate a treatment. The examples are educational formulations, not assessment instruments.",
        "The CAS expression encodes a selected cognitive pattern, not all physical checking.",
        "^7 is not an OCD marker; ^1 is not a recovery marker.",
        "The comparison is a different fictional account, not an instruction to stop safety checks or a therapy exercise.",
        "F6 and |A are author interpretations, not measured personality or cognitive-test scores.",
        "Alternative explanations to consider: A genuinely unreliable door latch; Distraction or interruptions during leaving-home tasks; A situational safety concern; a clinician would assess broader patterns rather than infer a disorder from this scene"
      ],
      "clinicalBackground": "OCD can involve unwanted thoughts and repeated checking with temporary relief. Checking itself does not establish OCD; distress, interference, history and other explanations need assessment.",
      "sources": [
        {
          "title": "APA: DSM-5-TR frequently asked questions",
          "url": "https://www.psychiatry.org/psychiatrists/practice/dsm/frequently-asked-questions"
        },
        {
          "title": "NIMH: Obsessive-Compulsive Disorder—When Unwanted Thoughts or Repetitive Behaviors Take Over",
          "url": "https://www.nimh.nih.gov/health/publications/obsessive-compulsive-disorder-when-unwanted-thoughts-or-repetitive-behaviors-take-over"
        }
      ]
    }
  },
  {
    "id": "professional-psychology-planning-and-starting",
    "pairId": "professional-psychology-planning-and-starting",
    "variant": "original",
    "title": "Wanting connection and beginning an action",
    "kind": "mapped-program",
    "source": "^2^C_{F4}|A",
    "context": "Keep a desired plan separate from an observed first action, and preserve the shared motive.",
    "story": "Leah, 38, works rotating shifts and has lately felt worn out. Everyday tasks are harder to start. Leah wants to reconnect with a friend. She is attracted to the idea of sending a message and mentally plans its first two sentences, comparing possible wording. She has not begun typing.",
    "mappings": [
      {
        "key": "state-operator",
        "token": "^2",
        "phrase": "attracted to the idea of sending a message",
        "name": "State operator",
        "explanation": "Positive names attraction to the idea, not a depression severity or recovery score.",
        "color": "cyan",
        "start": 0,
        "end": 2
      },
      {
        "key": "state-domain",
        "token": "^C",
        "phrase": "mentally plans its first two sentences",
        "name": "State domain",
        "explanation": "Cognitive domain: the plan is being thought through.",
        "color": "emerald",
        "start": 2,
        "end": 4
      },
      {
        "key": "state-drive",
        "token": "_{F4}",
        "phrase": "wants to reconnect with a friend",
        "name": "State drive",
        "explanation": "Connection is the explicit purpose.",
        "color": "amber",
        "start": 4,
        "end": 9
      },
      {
        "key": "state-register",
        "token": "|A",
        "phrase": "comparing possible wording",
        "name": "State register",
        "explanation": "Analytical register: considering alternatives.",
        "color": "pink",
        "start": 9,
        "end": 11
      }
    ],
    "changes": "The entire original state remains unchanged as the source. The edit adds a dependency arrow and a new target: ^1 Mind, ^O Operational, F4 Connection, |E Embodied. It is not a one-token change.",
    "question": "Which observations support the new action node, and which important barriers remain outside the expression?",
    "professional": {
      "field": "Psychology / DSM context",
      "use": "In teaching or collaborative formulation, separate stated desire, planning and observed action. Invite discussion of sleep, workload, health, support and practical barriers without turning non-action into a judgment about motivation.",
      "task": [
        "Keep a desired plan separate from an observed first action, and preserve the shared motive.",
        "Which observations support the new action node, and which important barriers remain outside the expression?"
      ],
      "expectedOutput": [
        "A C2 state becomes the source of a dependency relation with O1. Both carry F4; the source remains Analytical and the new target is Embodied.",
        "Selected version returns {\"kind\": \"state\", \"states\": {\"12\": 1}, \"dominant_state\": \"C2\", \"dominant_operator\": \"CO-2\", \"dominant_domain\": \"C\", \"dominant_drive\": \"F4\", \"register\": \"A\", \"register_name\": \"Analytical\"}.",
        "Every listed states weight 1 is the compiler's representation of one supplied literal, not 100% confidence, prevalence, severity or treatment response. 'admissible' and 'domain_descent_ok' are compiler checks only. Expected objects are result projections, not complete artifacts. Graph geometry and renderer layout are not asserted."
      ],
      "limits": [
        "CAS checks and represents the notation supplied by an author. It does not diagnose a person, measure symptoms, establish causation, or validate a treatment. The examples are educational formulations, not assessment instruments.",
        "The expression does not explain the difficulty initiating or establish depression.",
        "Adding an action node does not show treatment success or improved symptoms.",
        "The alternative scene is an editable narrative, not a behavioral prescription.",
        "No severity, diagnosis, causal estimate or clinical validation is produced.",
        "Alternative explanations to consider: Shift-related sleep disruption or exhaustion; Overload, caregiving demands or an unclear task; Medication effects or a medical condition assessed by a qualified clinician"
      ],
      "clinicalBackground": "Depression can affect energy and everyday functioning, but difficulty starting an activity has multiple possible explanations. Some medical conditions and medications can produce similar symptoms.",
      "sources": [
        {
          "title": "APA: DSM-5-TR frequently asked questions",
          "url": "https://www.psychiatry.org/psychiatrists/practice/dsm/frequently-asked-questions"
        },
        {
          "title": "NIMH: Depression",
          "url": "https://www.nimh.nih.gov/health/publications/depression"
        }
      ]
    }
  },
  {
    "id": "professional-psychology-planning-and-starting-variation",
    "pairId": "professional-psychology-planning-and-starting",
    "variant": "variation",
    "title": "Wanting connection and beginning an action",
    "kind": "mapped-program",
    "source": "^2^C_{F4}|A -> ^1^O_{F4}|E",
    "context": "Keep a desired plan separate from an observed first action, and preserve the shared motive.",
    "story": "Leah, 38, works rotating shifts and has lately felt worn out. Everyday tasks are harder to start. Leah wants to reconnect with a friend. She is attracted to the idea of sending a message and mentally plans its first two sentences, comparing possible wording. In the edited scene, Leah keeps her attention on typing the first sentence, noticing her fingers moving on the keyboard. She is now carrying out the first step of reconnecting. For this exercise, the author links the plan to that first action.",
    "mappings": [
      {
        "key": "source-operator",
        "token": "^2",
        "phrase": "attracted to the idea of sending a message",
        "name": "Source operator",
        "explanation": "Positive names attraction to the idea, not a depression severity or recovery score.",
        "color": "cyan",
        "start": 0,
        "end": 2
      },
      {
        "key": "source-domain",
        "token": "^C",
        "phrase": "mentally plans its first two sentences",
        "name": "Source domain",
        "explanation": "Cognitive domain: the plan is being thought through.",
        "color": "emerald",
        "start": 2,
        "end": 4
      },
      {
        "key": "source-drive",
        "token": "_{F4}",
        "phrase": "wants to reconnect with a friend",
        "name": "Source drive",
        "explanation": "Connection is the explicit purpose.",
        "color": "amber",
        "start": 4,
        "end": 9
      },
      {
        "key": "source-register",
        "token": "|A",
        "phrase": "comparing possible wording",
        "name": "Source register",
        "explanation": "Analytical register: considering alternatives.",
        "color": "pink",
        "start": 9,
        "end": 11
      },
      {
        "key": "target-operator",
        "token": "^1",
        "phrase": "keeps her attention on typing the first sentence",
        "name": "Target operator",
        "explanation": "Mind: attention during the action.",
        "color": "cyan",
        "start": 15,
        "end": 17
      },
      {
        "key": "target-domain",
        "token": "^O",
        "phrase": "carrying out the first step of reconnecting",
        "name": "Target domain",
        "explanation": "Operational domain: doing rather than planning.",
        "color": "emerald",
        "start": 17,
        "end": 19
      },
      {
        "key": "target-drive",
        "token": "_{F4}",
        "phrase": "wants to reconnect with a friend",
        "name": "Target drive",
        "explanation": "Connection stays the shared purpose.",
        "color": "amber",
        "start": 19,
        "end": 24
      },
      {
        "key": "target-register",
        "token": "|E",
        "phrase": "noticing her fingers moving on the keyboard",
        "name": "Target register",
        "explanation": "Embodied register. |E is not Evaluative domain ^E.",
        "color": "pink",
        "start": 24,
        "end": 26
      },
      {
        "key": "relation-relation",
        "token": "->",
        "phrase": "the author links the plan to that first action",
        "name": "Relation relation",
        "explanation": "An explicit authored dependency, not proof that planning caused action.",
        "color": "cyan",
        "start": 12,
        "end": 14
      }
    ],
    "changes": "The entire original state remains unchanged as the source. The edit adds a dependency arrow and a new target: ^1 Mind, ^O Operational, F4 Connection, |E Embodied. It is not a one-token change.",
    "question": "Which observations support the new action node, and which important barriers remain outside the expression?",
    "professional": {
      "field": "Psychology / DSM context",
      "use": "In teaching or collaborative formulation, separate stated desire, planning and observed action. Invite discussion of sleep, workload, health, support and practical barriers without turning non-action into a judgment about motivation.",
      "task": [
        "Keep a desired plan separate from an observed first action, and preserve the shared motive.",
        "Which observations support the new action node, and which important barriers remain outside the expression?"
      ],
      "expectedOutput": [
        "A C2 state becomes the source of a dependency relation with O1. Both carry F4; the source remains Analytical and the new target is Embodied.",
        "Selected version returns {\"kind\": \"relation\", \"relation\": \"dependency\", \"admissible\": true, \"domain_descent_ok\": true, \"source\": {\"kind\": \"state\", \"states\": {\"12\": 1}, \"dominant_state\": \"C2\", \"dominant_operator\": \"CO-2\", \"dominant_domain\": \"C\", \"dominant_drive\": \"F4\", \"register\": \"A\", \"register_name\": \"Analytical\"}, \"target\": {\"kind\": \"state\", \"states\": {\"31\": 1}, \"dominant_state\": \"O1\", \"dominant_operator\": \"CO-1\", \"dominant_domain\": \"O\", \"dominant_drive\": \"F4\", \"register\": \"E\", \"register_name\": \"Embodied\"}}.",
        "Every listed states weight 1 is the compiler's representation of one supplied literal, not 100% confidence, prevalence, severity or treatment response. 'admissible' and 'domain_descent_ok' are compiler checks only. Expected objects are result projections, not complete artifacts. Graph geometry and renderer layout are not asserted."
      ],
      "limits": [
        "CAS checks and represents the notation supplied by an author. It does not diagnose a person, measure symptoms, establish causation, or validate a treatment. The examples are educational formulations, not assessment instruments.",
        "The expression does not explain the difficulty initiating or establish depression.",
        "Adding an action node does not show treatment success or improved symptoms.",
        "The alternative scene is an editable narrative, not a behavioral prescription.",
        "No severity, diagnosis, causal estimate or clinical validation is produced.",
        "Alternative explanations to consider: Shift-related sleep disruption or exhaustion; Overload, caregiving demands or an unclear task; Medication effects or a medical condition assessed by a qualified clinician"
      ],
      "clinicalBackground": "Depression can affect energy and everyday functioning, but difficulty starting an activity has multiple possible explanations. Some medical conditions and medications can produce similar symptoms.",
      "sources": [
        {
          "title": "APA: DSM-5-TR frequently asked questions",
          "url": "https://www.psychiatry.org/psychiatrists/practice/dsm/frequently-asked-questions"
        },
        {
          "title": "NIMH: Depression",
          "url": "https://www.nimh.nih.gov/health/publications/depression"
        }
      ]
    }
  },
  {
    "id": "professional-ai-evidence-review",
    "pairId": "professional-ai-evidence-review",
    "variant": "original",
    "title": "AI: separate evidence review from a surfaced proposal — Inspect the evidence and the claim",
    "source": "^6^C_{F2}|A",
    "context": "A fictional retrieval assistant proposes that a customer can cancel without a fee. Its retrieved passage only states when a cancellation request may be submitted. The engineer must separate the passage, the proposed answer, and the missing support for the fee claim. This selected state represents one part of that review; the CAS expression does not read the passage or run the assistant.",
    "steps": [
      {
        "title": "Separate the claim",
        "text": "The engineer [[operator]]. The example passage concerns a submission window; the proposed answer adds a fee promise."
      },
      {
        "title": "Place the work",
        "text": "The engineer [[domain]]. Write the missing support as a question, rather than filling it in from expectation."
      },
      {
        "title": "Name the purpose",
        "text": "The engineer [[drive]]. Keep the source statement and the proposed statement distinct in the review record."
      },
      {
        "title": "Choose the method",
        "text": "The engineer [[register]]. The compiler represents these four declared choices; the external evaluation must test the answer."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^6",
        "color": "cyan",
        "name": "Operator: Male",
        "phrase": "separates the fee claim into the statements it depends on",
        "explanation": "Male names the ideas composing an idea. Here the author maps it to taking the proposed claim apart, not to an adverse emotional reaction.",
        "nodeId": "noetic:CO-6",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^C",
        "color": "emerald",
        "name": "Domain: Cognitive",
        "phrase": "works through what the passage does and does not support",
        "explanation": "Cognitive places the selected activity in reasoning about the proposed answer.",
        "nodeId": "domain:C",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F2}",
        "color": "amber",
        "name": "Drive: Wisdom",
        "phrase": "seeks a better understanding of the evidence gap",
        "explanation": "Wisdom is the declared motive to understand the relationship between the source and the claim.",
        "nodeId": "drive:F2",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|A",
        "color": "pink",
        "name": "Register: Analytical",
        "phrase": "compares each statement with an explicit citation",
        "explanation": "Analytical specifies an explicit comparison. It does not expose or certify a model's internal reasoning.",
        "nodeId": "register:A",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:C6_F2_A",
      "label": "C6_F2|A",
      "reading": "The engineer analytically takes the proposed answer apart to understand which statements the retrieved passage supports."
    },
    "professional": {
      "field": "AI engineering",
      "use": "Designing an evaluation case that distinguishes source support from an answer that merely came to mind.",
      "task": "Create a three-column review record: exact source passage, proposed claim, and the test or citation needed to support it. Mark the unsupported fee claim for follow-up. Compare the two states, then run the companion CCDL map to inspect where a second declared review stage would sit.",
      "expectedOutput": "A valid compound CAS state with one state node and the four selected noetic, domain, drive, and register nodes. Change only ^6 to ^9. The original names decomposing the claim; the variation names the proposal that a prompt or passage brought to mind. The change does not make the proposal true.",
      "limits": "These are author-selected descriptions of a fictional review. CAS neither retrieves evidence nor checks entailment, factual correctness, model reasoning, or compliance. A valid state or connected graph is not a passing AI evaluation.",
      "sources": [
        {
          "title": "NIST AI RMF 1.0 — MAP and MEASURE",
          "url": "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf"
        }
      ],
      "comparison": "Change only ^6 to ^9. The original names decomposing the claim; the variation names the proposal that a prompt or passage brought to mind. The change does not make the proposal true."
    }
  },
  {
    "id": "professional-ai-evidence-review-variation",
    "pairId": "professional-ai-evidence-review",
    "variant": "variation",
    "title": "AI: separate evidence review from a surfaced proposal — Identify the proposal that was surfaced",
    "source": "^9^C_{F2}|A",
    "context": "A fictional retrieval assistant proposes that a customer can cancel without a fee. Its retrieved passage only states when a cancellation request may be submitted. The engineer must separate the passage, the proposed answer, and the missing support for the fee claim. This selected state represents one part of that review; the CAS expression does not read the passage or run the assistant.",
    "steps": [
      {
        "title": "Select another role",
        "text": "The reviewer [[operator]]. This is the proposal under inspection; it is not the inspection operation itself."
      },
      {
        "title": "Keep the level explicit",
        "text": "The reviewer [[domain]]. No live generation or retrieval occurs when this literal runs."
      },
      {
        "title": "Keep the motive explicit",
        "text": "The reviewer [[drive]]. The same purpose can accompany a different noetic role."
      },
      {
        "title": "Compare the output",
        "text": "The reviewer [[register]]. Only the noetic node changes from ^6 to ^9; the other three declared coordinates remain the same."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^9",
        "color": "cyan",
        "name": "Operator: Below/Effect",
        "phrase": "identifies the fee-free cancellation proposal brought to mind by the passage",
        "explanation": "Below/Effect names the idea brought to mind by a trigger. This annotation describes the candidate proposal, not a proof or a correct conclusion.",
        "nodeId": "noetic:CO-9",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^C",
        "color": "emerald",
        "name": "Domain: Cognitive",
        "phrase": "considers that proposal as an idea within the review",
        "explanation": "Cognitive keeps the selected state at the level of considering an idea.",
        "nodeId": "domain:C",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F2}",
        "color": "amber",
        "name": "Drive: Wisdom",
        "phrase": "seeks to understand why this candidate answer needs checking",
        "explanation": "Wisdom remains the declared motive; it is not a measured capability of the assistant.",
        "nodeId": "drive:F2",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|A",
        "color": "pink",
        "name": "Register: Analytical",
        "phrase": "records the proposal and its stated source separately",
        "explanation": "Analytical remains the manner of recording and comparing the proposal.",
        "nodeId": "register:A",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:C9_F2_A",
      "label": "C9_F2|A",
      "reading": "The selected state now names the candidate proposal considered during the review, with an analytical focus on understanding its source."
    },
    "professional": {
      "field": "AI engineering",
      "use": "Designing an evaluation case that distinguishes source support from an answer that merely came to mind.",
      "task": "Create a three-column review record: exact source passage, proposed claim, and the test or citation needed to support it. Mark the unsupported fee claim for follow-up. Compare the two states, then run the companion CCDL map to inspect where a second declared review stage would sit.",
      "expectedOutput": "A valid compound CAS state with one state node and the four selected noetic, domain, drive, and register nodes. Change only ^6 to ^9. The original names decomposing the claim; the variation names the proposal that a prompt or passage brought to mind. The change does not make the proposal true.",
      "limits": "These are author-selected descriptions of a fictional review. CAS neither retrieves evidence nor checks entailment, factual correctness, model reasoning, or compliance. A valid state or connected graph is not a passing AI evaluation.",
      "sources": [
        {
          "title": "NIST AI RMF 1.0 — MAP and MEASURE",
          "url": "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf"
        }
      ],
      "comparison": "Change only ^6 to ^9. The original names decomposing the claim; the variation names the proposal that a prompt or passage brought to mind. The change does not make the proposal true."
    }
  },
  {
    "id": "professional-incident-assumptions",
    "pairId": "professional-incident-assumptions",
    "variant": "original",
    "title": "Software: revise an incident hypothesis — Make the inherited explanation visible",
    "source": "^5^C_{F6}|A",
    "context": "In a fictional service incident, the working hypothesis says the connection pool is too small. A supplied test fixture says increasing the pool did not remove the timeout, while requests sharing one database key still stalled. The engineer must distinguish the team's inherited explanation from the work of examining that explanation. The fixture is invented for the lesson and is not a production observation.",
    "steps": [
      {
        "title": "Surface assumptions",
        "text": "The engineer [[operator]]. A previous pool incident may explain why this hypothesis was selected, but does not establish this incident's cause."
      },
      {
        "title": "Keep hypothesis distinct",
        "text": "The engineer [[domain]]. Put the supplied observations in separate table cells."
      },
      {
        "title": "Organize the record",
        "text": "The engineer [[drive]]. A tidy account can still be wrong."
      },
      {
        "title": "Make it reviewable",
        "text": "The engineer [[register]]. Compare this state with the variation that examines the explanation's parts."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^5",
        "color": "cyan",
        "name": "Operator: Female",
        "phrase": "draws on the team's accumulated assumptions about pool-related timeouts",
        "explanation": "Female refers to accumulated ideas composing a mind. The author maps it to the team's inherited understanding; it does not mean an empty data store.",
        "nodeId": "noetic:CO-5",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^C",
        "color": "emerald",
        "name": "Domain: Cognitive",
        "phrase": "holds those assumptions as a working explanation",
        "explanation": "Cognitive names the level of considering an explanation.",
        "nodeId": "domain:C",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F6}",
        "color": "amber",
        "name": "Drive: Structure",
        "phrase": "aims for an orderly and internally consistent account",
        "explanation": "Structure is the declared concern for an organized explanation. It does not certify correctness.",
        "nodeId": "drive:F6",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|A",
        "color": "pink",
        "name": "Register: Analytical",
        "phrase": "states the assumptions in a reviewable hypothesis table",
        "explanation": "Analytical indicates that the assumptions are made explicit for inspection.",
        "nodeId": "register:A",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:C5_F6_A",
      "label": "C5_F6|A",
      "reading": "The selected state describes the team's accumulated understanding, expressed analytically as a structured working explanation."
    },
    "professional": {
      "field": "Software engineering",
      "use": "Writing an incident investigation that separates prior beliefs, observations, hypotheses, and tests.",
      "task": "Build a short hypothesis table with the pool-size explanation, the provided observations, and a controlled test for lock contention. Identify which observation would weaken each hypothesis. Compare the selected states and inspect the companion relation map before changing real service settings.",
      "expectedOutput": "A valid compound CAS state with one state node and the four selected noetic, domain, drive, and register nodes. Change ^5 to ^6 while retaining ^C, F6, and |A. The selected role changes from the team's accumulated working assumptions to examining the parts of one explanation.",
      "limits": "CAS does not query logs, reproduce the incident, identify a root cause, or establish that lock contention occurred. The arrows in the companion map are declared structural relations, not a timestamped incident history or proof of causation.",
      "sources": [
        {
          "title": "Google SRE — Effective Troubleshooting",
          "url": "https://sre.google/sre-book/effective-troubleshooting/"
        }
      ],
      "comparison": "Change ^5 to ^6 while retaining ^C, F6, and |A. The selected role changes from the team's accumulated working assumptions to examining the parts of one explanation."
    }
  },
  {
    "id": "professional-incident-assumptions-variation",
    "pairId": "professional-incident-assumptions",
    "variant": "variation",
    "title": "Software: revise an incident hypothesis — Examine the explanation against a test",
    "source": "^6^C_{F6}|A",
    "context": "In a fictional service incident, the working hypothesis says the connection pool is too small. A supplied test fixture says increasing the pool did not remove the timeout, while requests sharing one database key still stalled. The engineer must distinguish the team's inherited explanation from the work of examining that explanation. The fixture is invented for the lesson and is not a production observation.",
    "steps": [
      {
        "title": "Decompose the hypothesis",
        "text": "The engineer [[operator]]. Write what should change if pool size is the limiting factor."
      },
      {
        "title": "Use the fixture",
        "text": "The engineer [[domain]]. The unchanged timeout weakens this particular explanation under the fictional test conditions."
      },
      {
        "title": "State the next test",
        "text": "The engineer [[drive]]. Define a lock-contention test that can also fail to support the alternative."
      },
      {
        "title": "Compare the selected role",
        "text": "The engineer [[register]]. The graph changes only the noetic coordinate, from accumulated assumptions to examination."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^6",
        "color": "cyan",
        "name": "Operator: Male",
        "phrase": "breaks the pool-size explanation into assumptions and predicted observations",
        "explanation": "Male identifies decomposition of an idea into its constituent ideas. It fits scrutiny of a hypothesis; ^3 Negative would instead describe aversion.",
        "nodeId": "noetic:CO-6",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^C",
        "color": "emerald",
        "name": "Domain: Cognitive",
        "phrase": "reasons about whether the supplied test fixture fits those assumptions",
        "explanation": "Cognitive keeps the activity in reasoning about the explanation and test.",
        "nodeId": "domain:C",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F6}",
        "color": "amber",
        "name": "Drive: Structure",
        "phrase": "aims to make the hypothesis and its test conditions consistent",
        "explanation": "Structure keeps the same declared motive while the operation changes.",
        "nodeId": "drive:F6",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|A",
        "color": "pink",
        "name": "Register: Analytical",
        "phrase": "compares an expected observation with the stated result",
        "explanation": "Analytical identifies an explicit comparison, without asserting that the fixture proves a root cause.",
        "nodeId": "register:A",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:C6_F6_A",
      "label": "C6_F6|A",
      "reading": "The engineer analytically decomposes a working hypothesis and compares its stated predictions with the fictional test fixture."
    },
    "professional": {
      "field": "Software engineering",
      "use": "Writing an incident investigation that separates prior beliefs, observations, hypotheses, and tests.",
      "task": "Build a short hypothesis table with the pool-size explanation, the provided observations, and a controlled test for lock contention. Identify which observation would weaken each hypothesis. Compare the selected states and inspect the companion relation map before changing real service settings.",
      "expectedOutput": "A valid compound CAS state with one state node and the four selected noetic, domain, drive, and register nodes. Change ^5 to ^6 while retaining ^C, F6, and |A. The selected role changes from the team's accumulated working assumptions to examining the parts of one explanation.",
      "limits": "CAS does not query logs, reproduce the incident, identify a root cause, or establish that lock contention occurred. The arrows in the companion map are declared structural relations, not a timestamped incident history or proof of causation.",
      "sources": [
        {
          "title": "Google SRE — Effective Troubleshooting",
          "url": "https://sre.google/sre-book/effective-troubleshooting/"
        }
      ],
      "comparison": "Change ^5 to ^6 while retaining ^C, F6, and |A. The selected role changes from the team's accumulated working assumptions to examining the parts of one explanation."
    }
  },
  {
    "id": "professional-requirements-tradeoff",
    "pairId": "professional-requirements-tradeoff",
    "variant": "original",
    "title": "Systems: trace requirements before judging a tradeoff — Decompose the requirement and its trace",
    "source": "^6^C_{F6}|A",
    "context": "A fictional field-monitoring system has a parent requirement to preserve a usable warning when a communications link is unavailable. One proposal buffers readings locally; another shuts down transmission earlier to conserve its declared energy budget. The review must first decompose the requirements, then judge a proposal against the mission purpose. No reliability, energy, or safety value is measured in this lesson.",
    "steps": [
      {
        "title": "Identify the parts",
        "text": "The engineer [[operator]]. Include buffering, the stale-data indication, and the disconnected-link test."
      },
      {
        "title": "Preserve the parent link",
        "text": "The engineer [[domain]]. Each proposed child must explain how it supports the warning requirement."
      },
      {
        "title": "Check the structure",
        "text": "The engineer [[drive]]. Record an unknown or missing link rather than treating it as verified."
      },
      {
        "title": "Make the trace inspectable",
        "text": "The engineer [[register]]. The companion set exercise checks only the declared symbolic perspectives."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^6",
        "color": "cyan",
        "name": "Operator: Male",
        "phrase": "separates the warning requirement into subordinate behaviors and test conditions",
        "explanation": "Male names decomposition of the requirement into constituent ideas.",
        "nodeId": "noetic:CO-6",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^C",
        "color": "emerald",
        "name": "Domain: Cognitive",
        "phrase": "reasons about how each part relates to the parent requirement",
        "explanation": "Cognitive places the selected activity in understanding the requirement structure.",
        "nodeId": "domain:C",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F6}",
        "color": "amber",
        "name": "Drive: Structure",
        "phrase": "seeks an explicit and consistent requirement structure",
        "explanation": "Structure is the stated motive for a coherent trace.",
        "nodeId": "drive:F6",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|A",
        "color": "pink",
        "name": "Register: Analytical",
        "phrase": "writes parent, child, and planned verification links in a trace table",
        "explanation": "Analytical describes the explicit trace table. The literal itself contains no requirement database.",
        "nodeId": "register:A",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:C6_F6_A",
      "label": "C6_F6|A",
      "reading": "The engineer analytically decomposes a requirement to make its structure and intended verification links explicit."
    },
    "professional": {
      "field": "Systems engineering",
      "use": "Preparing a design review that separates requirement structure from an evaluation of a candidate design.",
      "task": "Write a small trace table from the parent warning requirement to local buffering, stale-data indication, and a planned disconnected-link test. Then state the tradeoff question: which proposal preserves the required warning behavior? Use the companion set exercise to find a deliberately omitted CAS perspective, while keeping the real requirement trace table as the engineering evidence.",
      "expectedOutput": "A valid compound CAS state with one state node and the four selected noetic, domain, drive, and register nodes. Change ^C to ^E and F6 to F7, keeping ^6 and |A. The operation still examines constituent ideas, but its declared setting becomes evaluation and its motive becomes mission purpose.",
      "limits": "The CAS set contains declared state perspectives, not requirement IDs or verification results. Set membership and a zero missing count cannot certify completeness, safety, traceability, or mission success. Those require the actual requirements and verification evidence.",
      "sources": [
        {
          "title": "NASA Systems Engineering Handbook — Requirements Management",
          "url": "https://www.nasa.gov/reference/6-2-requirements-management/"
        }
      ],
      "comparison": "Change ^C to ^E and F6 to F7, keeping ^6 and |A. The operation still examines constituent ideas, but its declared setting becomes evaluation and its motive becomes mission purpose."
    }
  },
  {
    "id": "professional-requirements-tradeoff-variation",
    "pairId": "professional-requirements-tradeoff",
    "variant": "variation",
    "title": "Systems: trace requirements before judging a tradeoff — Evaluate the parts against mission purpose",
    "source": "^6^E_{F7}|A",
    "context": "A fictional field-monitoring system has a parent requirement to preserve a usable warning when a communications link is unavailable. One proposal buffers readings locally; another shuts down transmission earlier to conserve its declared energy budget. The review must first decompose the requirements, then judge a proposal against the mission purpose. No reliability, energy, or safety value is measured in this lesson.",
    "steps": [
      {
        "title": "Keep the operation",
        "text": "The reviewer [[operator]]. A component list alone does not establish the preferred proposal."
      },
      {
        "title": "Change the setting",
        "text": "The reviewer [[domain]]. Mark each criterion as supported, unsupported, or awaiting a planned test."
      },
      {
        "title": "Change the motive",
        "text": "The reviewer [[drive]]. A smaller buffer or lower energy assumption is not automatically the better design."
      },
      {
        "title": "Record the decision basis",
        "text": "The reviewer [[register]]. The changed graph exposes the declared perspective; it does not decide the tradeoff."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^6",
        "color": "cyan",
        "name": "Operator: Male",
        "phrase": "examines which parts of each proposal preserve the required warning behavior",
        "explanation": "Male remains decomposition: the reviewer examines the contribution of each proposal part.",
        "nodeId": "noetic:CO-6",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^E",
        "color": "emerald",
        "name": "Domain: Evaluative",
        "phrase": "evaluates the proposals against the stated mission objective",
        "explanation": "Evaluative changes the declared setting from understanding the structure to judging candidate proposals.",
        "nodeId": "domain:E",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F7}",
        "color": "amber",
        "name": "Drive: Purpose",
        "phrase": "keeps the useful warning as the reason for the design decision",
        "explanation": "Purpose names the mission-oriented motive selected by the author.",
        "nodeId": "drive:F7",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|A",
        "color": "pink",
        "name": "Register: Analytical",
        "phrase": "records criteria, assumptions, and unresolved evidence in a tradeoff table",
        "explanation": "Analytical describes an explicit tradeoff table, not an automatically optimized design.",
        "nodeId": "register:A",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:E6_F7_A",
      "label": "E6_F7|A",
      "reading": "The reviewer analytically examines proposal parts in an evaluation guided by the mission's warning purpose."
    },
    "professional": {
      "field": "Systems engineering",
      "use": "Preparing a design review that separates requirement structure from an evaluation of a candidate design.",
      "task": "Write a small trace table from the parent warning requirement to local buffering, stale-data indication, and a planned disconnected-link test. Then state the tradeoff question: which proposal preserves the required warning behavior? Use the companion set exercise to find a deliberately omitted CAS perspective, while keeping the real requirement trace table as the engineering evidence.",
      "expectedOutput": "A valid compound CAS state with one state node and the four selected noetic, domain, drive, and register nodes. Change ^C to ^E and F6 to F7, keeping ^6 and |A. The operation still examines constituent ideas, but its declared setting becomes evaluation and its motive becomes mission purpose.",
      "limits": "The CAS set contains declared state perspectives, not requirement IDs or verification results. Set membership and a zero missing count cannot certify completeness, safety, traceability, or mission success. Those require the actual requirements and verification evidence.",
      "sources": [
        {
          "title": "NASA Systems Engineering Handbook — Requirements Management",
          "url": "https://www.nasa.gov/reference/6-2-requirements-management/"
        }
      ],
      "comparison": "Change ^C to ^E and F6 to F7, keeping ^6 and |A. The operation still examines constituent ideas, but its declared setting becomes evaluation and its motive becomes mission purpose."
    }
  },
  {
    "id": "professional-pipeline-propagation",
    "pairId": "professional-pipeline-propagation",
    "variant": "original",
    "title": "Systems: inspect a bounded two-stage model — Select the triggering role",
    "source": "^8^C_{F5}|A",
    "context": "An engineer sketches a fictional two-stage processing model before connecting any software or hardware. A supplied input stimulates the first stage; the second stage receives its computed value. The selected CAS state distinguishes a triggering idea from the idea brought to mind. The companion CCDL simulation is a separate, explicitly declared scalar model with fixed bias and exact inputs.",
    "steps": [
      {
        "title": "Identify the trigger",
        "text": "The engineer [[operator]]. The input value is supplied by the companion exercise, not inferred from this notation."
      },
      {
        "title": "Place the model",
        "text": "The engineer [[domain]]. No real queue, device, or model endpoint is connected."
      },
      {
        "title": "State the motive",
        "text": "The engineer [[drive]]. A clear declaration makes assumptions reviewable without validating them."
      },
      {
        "title": "Separate structure and arithmetic",
        "text": "The engineer [[register]]. Run the CCDL exercise for numbers; this literal only specifies the selected state."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^8",
        "color": "cyan",
        "name": "Operator: Above/Cause",
        "phrase": "marks the input idea that is intended to bring another idea to mind",
        "explanation": "Above/Cause is an associative trigger in CAS. It does not mean logical deduction or demonstrated physical causation.",
        "nodeId": "noetic:CO-8",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^C",
        "color": "emerald",
        "name": "Domain: Cognitive",
        "phrase": "describes that trigger within the conceptual model",
        "explanation": "Cognitive places the selected trigger at the level of ideas in the model.",
        "nodeId": "domain:C",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F5}",
        "color": "amber",
        "name": "Drive: Agency",
        "phrase": "aims to make the declared processing step controllable",
        "explanation": "Agency is the authored motive to make a step controllable, not a measured control capability.",
        "nodeId": "drive:F5",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|A",
        "color": "pink",
        "name": "Register: Analytical",
        "phrase": "states the trigger and its connection explicitly",
        "explanation": "Analytical identifies the explicit model description.",
        "nodeId": "register:A",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:C8_F5_A",
      "label": "C8_F5|A",
      "reading": "The engineer describes an analytical, agency-oriented trigger at the cognitive level."
    },
    "professional": {
      "field": "Systems engineering",
      "use": "Checking the consequences of declared gain, cutoff, and saturation assumptions in a small model.",
      "task": "Before running the companion simulation, calculate both stage values for inputs 0.1, 0.5, 0, and 0.375. Compare the baseline first-stage saturation of 0.75 with a variation of 0.50. Explain which outputs change, then list what would need measurement before applying the model to a real processing system.",
      "expectedOutput": "A valid compound CAS state with one state node and the four selected noetic, domain, drive, and register nodes. Change ^8 to ^9 while retaining ^C, F5, and |A. The selected state changes from a trigger role to a triggered idea. To change the numeric model, edit the separate CCDL saturation parameter.",
      "limits": "The values are dimensionless model inputs and exact arithmetic outputs, not probabilities, measured attention, token rates, latency, electrical current, or predicted system performance. Four logical ticks are not four seconds. The state literal alone performs no simulation.",
      "sources": [],
      "comparison": "Change ^8 to ^9 while retaining ^C, F5, and |A. The selected state changes from a trigger role to a triggered idea. To change the numeric model, edit the separate CCDL saturation parameter."
    }
  },
  {
    "id": "professional-pipeline-propagation-variation",
    "pairId": "professional-pipeline-propagation",
    "variant": "variation",
    "title": "Systems: inspect a bounded two-stage model — Select the resulting idea",
    "source": "^9^C_{F5}|A",
    "context": "An engineer sketches a fictional two-stage processing model before connecting any software or hardware. A supplied input stimulates the first stage; the second stage receives its computed value. The selected CAS state distinguishes a triggering idea from the idea brought to mind. The companion CCDL simulation is a separate, explicitly declared scalar model with fixed bias and exact inputs.",
    "steps": [
      {
        "title": "Select the result role",
        "text": "The engineer [[operator]]. The variation identifies what is being represented after the trigger."
      },
      {
        "title": "Keep the setting",
        "text": "The engineer [[domain]]. The graph is a symbolic model rather than a live processing trace."
      },
      {
        "title": "Keep the motive",
        "text": "The engineer [[drive]]. Availability of a candidate does not mean the next step should execute it."
      },
      {
        "title": "Compare the coordinates",
        "text": "The engineer [[register]]. The state variation changes one coordinate; the companion numeric variation changes a saturation assumption."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^9",
        "color": "cyan",
        "name": "Operator: Below/Effect",
        "phrase": "marks the candidate idea brought to mind by the declared trigger",
        "explanation": "Below/Effect names the triggered idea. A numeric value at that node does not establish the idea's correctness.",
        "nodeId": "noetic:CO-9",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^C",
        "color": "emerald",
        "name": "Domain: Cognitive",
        "phrase": "describes the candidate within the conceptual model",
        "explanation": "Cognitive remains the declared level.",
        "nodeId": "domain:C",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F5}",
        "color": "amber",
        "name": "Drive: Agency",
        "phrase": "aims to make the modeled result available for a next step",
        "explanation": "Agency remains the authored motive, not evidence of an autonomous action.",
        "nodeId": "drive:F5",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|A",
        "color": "pink",
        "name": "Register: Analytical",
        "phrase": "records the result role separately from the trigger role",
        "explanation": "Analytical remains the stated manner of description.",
        "nodeId": "register:A",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:C9_F5_A",
      "label": "C9_F5|A",
      "reading": "The selected state now names the candidate idea produced by the model's declared trigger relationship."
    },
    "professional": {
      "field": "Systems engineering",
      "use": "Checking the consequences of declared gain, cutoff, and saturation assumptions in a small model.",
      "task": "Before running the companion simulation, calculate both stage values for inputs 0.1, 0.5, 0, and 0.375. Compare the baseline first-stage saturation of 0.75 with a variation of 0.50. Explain which outputs change, then list what would need measurement before applying the model to a real processing system.",
      "expectedOutput": "A valid compound CAS state with one state node and the four selected noetic, domain, drive, and register nodes. Change ^8 to ^9 while retaining ^C, F5, and |A. The selected state changes from a trigger role to a triggered idea. To change the numeric model, edit the separate CCDL saturation parameter.",
      "limits": "The values are dimensionless model inputs and exact arithmetic outputs, not probabilities, measured attention, token rates, latency, electrical current, or predicted system performance. Four logical ticks are not four seconds. The state literal alone performs no simulation.",
      "sources": [],
      "comparison": "Change ^8 to ^9 while retaining ^C, F5, and |A. The selected state changes from a trigger role to a triggered idea. To change the numeric model, edit the separate CCDL saturation parameter."
    }
  },
  {
    "id": "professional-workflow-resources",
    "pairId": "professional-workflow-resources",
    "variant": "original",
    "title": "Human factors: examine a handoff and its resource assumptions — Attend to the handoff problem",
    "source": "^1^C_{F6}|A",
    "context": "A fictional operations team loses context when incident work changes hands. The proposed process uses a shared working record and a brief handoff routine. The selected state changes from awareness of the workflow to a repeated operational pattern. A separate CAS Ohm exercise explores an assumed drive-to-constraint ratio; its values are design scores, not measurements of people or productivity.",
    "steps": [
      {
        "title": "Notice the information path",
        "text": "The reviewer [[operator]]. Identify where an assumption can be lost between owners."
      },
      {
        "title": "Understand the workflow",
        "text": "The reviewer [[domain]]. Describe the current and proposed handoff before evaluating either."
      },
      {
        "title": "Name the intended order",
        "text": "The reviewer [[drive]]. The proposed fields should make open work visible."
      },
      {
        "title": "Prepare a comparison",
        "text": "The reviewer [[register]]. The state does not observe a real team or score its attention."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^1",
        "color": "cyan",
        "name": "Operator: Mind",
        "phrase": "attends to how the team receives, stores, and passes on incident ideas",
        "explanation": "Mind names awareness that takes in, stores, processes, and outputs ideas. The annotation uses that structural role for attention to the workflow.",
        "nodeId": "noetic:CO-1",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^C",
        "color": "emerald",
        "name": "Domain: Cognitive",
        "phrase": "considers the handoff as a workflow to understand",
        "explanation": "Cognitive places this selected activity in understanding the workflow.",
        "nodeId": "domain:C",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F6}",
        "color": "amber",
        "name": "Drive: Structure",
        "phrase": "seeks an orderly record of the incident work",
        "explanation": "Structure names the declared motive for an organized working record.",
        "nodeId": "drive:F6",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|A",
        "color": "pink",
        "name": "Register: Analytical",
        "phrase": "reviews the proposed handoff fields one by one",
        "explanation": "Analytical describes an explicit review of the proposed fields.",
        "nodeId": "register:A",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:C1_F6_A",
      "label": "C1_F6|A",
      "reading": "The reviewer attends analytically to the handoff workflow with an explicit concern for its structure."
    },
    "professional": {
      "field": "Human factors and organizational learning",
      "use": "Reviewing a coordination process and making an uncalibrated resource model explicit.",
      "task": "Draft a handoff card containing current impact, working hypotheses, actions already tried, and the next owner. Compare awareness of the process with performing its repeated routine. Then change the companion constraint input from 4 to 3 and explain why the resulting change from 3 to 4 follows from the declared equation alone.",
      "expectedOutput": "A valid compound CAS state with one state node and the four selected noetic, domain, drive, and register nodes. Change ^1^C to ^7^O while retaining F6 and |A. The selected state moves from awareness of the workflow to a repeated, explicitly organized operational routine.",
      "limits": "The process is a fictional design proposal. CAS does not measure team attention, workload, staffing needs, incident outcomes, or psychological traits. CAS Ohm reports the user-declared scale as unverified. A larger calculated ratio does not prove that the proposed handoff is better.",
      "sources": [
        {
          "title": "Google SRE Workbook — Incident Response",
          "url": "https://sre.google/workbook/incident-response/"
        }
      ],
      "comparison": "Change ^1^C to ^7^O while retaining F6 and |A. The selected state moves from awareness of the workflow to a repeated, explicitly organized operational routine."
    }
  },
  {
    "id": "professional-workflow-resources-variation",
    "pairId": "professional-workflow-resources",
    "variant": "variation",
    "title": "Human factors: examine a handoff and its resource assumptions — Specify the repeated handoff routine",
    "source": "^7^O_{F6}|A",
    "context": "A fictional operations team loses context when incident work changes hands. The proposed process uses a shared working record and a brief handoff routine. The selected state changes from awareness of the workflow to a repeated operational pattern. A separate CAS Ohm exercise explores an assumed drive-to-constraint ratio; its values are design scores, not measurements of people or productivity.",
    "steps": [
      {
        "title": "Define the repetition",
        "text": "The team [[operator]]. The trigger is a change of owner, not a frequency inferred by CAS."
      },
      {
        "title": "Place it in practice",
        "text": "The team [[domain]]. An actual trial would be needed to learn whether the routine helps."
      },
      {
        "title": "Keep the intended structure",
        "text": "The team [[drive]]. The record should expose unanswered questions as well as completed actions."
      },
      {
        "title": "Compare assumptions",
        "text": "The team [[register]]. Use the Ohm exercise only to inspect the declared ratio, not to predict a staffing or productivity result."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^7",
        "color": "cyan",
        "name": "Operator: Rhythm",
        "phrase": "defines a repeated handoff pattern at each owner change",
        "explanation": "Rhythm names a rate or pattern of exposure or practice. Here it is an authored repeated handoff pattern, without a measured frequency.",
        "nodeId": "noetic:CO-7",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^O",
        "color": "emerald",
        "name": "Domain: Operational",
        "phrase": "places that pattern in the team's proposed operational work",
        "explanation": "Operational places the selected routine at the level of action.",
        "nodeId": "domain:O",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F6}",
        "color": "amber",
        "name": "Drive: Structure",
        "phrase": "seeks a consistent structure for each transfer",
        "explanation": "Structure preserves the same stated motive.",
        "nodeId": "drive:F6",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|A",
        "color": "pink",
        "name": "Register: Analytical",
        "phrase": "uses the same explicit handoff checklist each time",
        "explanation": "Analytical specifies an explicit checklist. Operational domain does not require Embodied register.",
        "nodeId": "register:A",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:O7_F6_A",
      "label": "O7_F6|A",
      "reading": "The proposed operational routine repeats an analytical handoff checklist to preserve an explicit structure."
    },
    "professional": {
      "field": "Human factors and organizational learning",
      "use": "Reviewing a coordination process and making an uncalibrated resource model explicit.",
      "task": "Draft a handoff card containing current impact, working hypotheses, actions already tried, and the next owner. Compare awareness of the process with performing its repeated routine. Then change the companion constraint input from 4 to 3 and explain why the resulting change from 3 to 4 follows from the declared equation alone.",
      "expectedOutput": "A valid compound CAS state with one state node and the four selected noetic, domain, drive, and register nodes. Change ^1^C to ^7^O while retaining F6 and |A. The selected state moves from awareness of the workflow to a repeated, explicitly organized operational routine.",
      "limits": "The process is a fictional design proposal. CAS does not measure team attention, workload, staffing needs, incident outcomes, or psychological traits. CAS Ohm reports the user-declared scale as unverified. A larger calculated ratio does not prove that the proposed handoff is better.",
      "sources": [
        {
          "title": "Google SRE Workbook — Incident Response",
          "url": "https://sre.google/workbook/incident-response/"
        }
      ],
      "comparison": "Change ^1^C to ^7^O while retaining F6 and |A. The selected state moves from awareness of the workflow to a repeated, explicitly organized operational routine."
    }
  },
  {
    "id": "professional-learning-transfer",
    "pairId": "professional-learning-transfer",
    "variant": "original",
    "title": "Education: move from a worked trace to hands-on practice — Unpack the worked packet trace",
    "source": "^6^C_{F2}|A",
    "context": "A trainer gives junior engineers a fictional packet-delivery exercise with three labeled cards: a request, an acknowledgement, and a retry after a missing acknowledgement. Learners first take apart a worked sequence, then repeatedly arrange and test the cards themselves. The selected CAS states describe these planned activities. They do not measure knowledge, retention, or learning effectiveness.",
    "steps": [
      {
        "title": "Inspect the example",
        "text": "The learner [[operator]]. Label the request identifier and the matching acknowledgement identifier."
      },
      {
        "title": "Explain the relation",
        "text": "The learner [[domain]]. Use only the fictional protocol rule supplied by the trainer."
      },
      {
        "title": "State the learning purpose",
        "text": "The learner [[drive]]. The trainer still needs an actual response to assess understanding."
      },
      {
        "title": "Make reasoning explicit",
        "text": "The learner [[register]]. Compare the next state to see how the planned activity changes."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^6",
        "color": "cyan",
        "name": "Operator: Male",
        "phrase": "breaks the worked packet trace into requests, acknowledgements, and retry conditions",
        "explanation": "Male names the constituent ideas of an idea. Here the selected activity takes the worked example apart.",
        "nodeId": "noetic:CO-6",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^C",
        "color": "emerald",
        "name": "Domain: Cognitive",
        "phrase": "reasons about how those parts fit together",
        "explanation": "Cognitive places the activity in reasoning about the trace.",
        "nodeId": "domain:C",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F2}",
        "color": "amber",
        "name": "Drive: Wisdom",
        "phrase": "seeks to understand the acknowledgement rule",
        "explanation": "Wisdom is the author's stated motive to understand the rule.",
        "nodeId": "drive:F2",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|A",
        "color": "pink",
        "name": "Register: Analytical",
        "phrase": "explains each step and its stated condition",
        "explanation": "Analytical identifies explicit explanation of steps and conditions.",
        "nodeId": "register:A",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:C6_F2_A",
      "label": "C6_F2|A",
      "reading": "The learner analytically decomposes a worked packet trace in order to understand its acknowledgement rule."
    },
    "professional": {
      "field": "Engineering education",
      "use": "Designing instruction that connects an explicit explanation with a concrete practice activity.",
      "task": "Prepare one worked packet trace and one altered trace with the acknowledgement missing. Ask the learner to explain the field that links an acknowledgement to a request, then arrange the cards and justify a retry. Record the learner's actual answer separately. Compare the two CAS states to identify which activity the lesson plan currently represents.",
      "expectedOutput": "A valid compound CAS state with one state node and the four selected noetic, domain, drive, and register nodes. Change ^6^C to ^7^O and |A to |E, keeping F2. The selected state changes from analytical decomposition to repeated concrete practice; both are authored ways to pursue understanding.",
      "limits": "The packet protocol is a fictional teaching fixture, not a standards-conformant implementation. CAS does not run a network, grade the learner, infer learning gains, or validate a teaching method. The educational reference supports the lesson-design context, not the CAS mapping.",
      "sources": [
        {
          "title": "IES Practice Guide — Organizing Instruction and Study to Improve Student Learning",
          "url": "https://ies.ed.gov/ncee/wwc/practiceguide/1"
        }
      ],
      "comparison": "Change ^6^C to ^7^O and |A to |E, keeping F2. The selected state changes from analytical decomposition to repeated concrete practice; both are authored ways to pursue understanding."
    }
  },
  {
    "id": "professional-learning-transfer-variation",
    "pairId": "professional-learning-transfer",
    "variant": "variation",
    "title": "Education: move from a worked trace to hands-on practice — Practice with a changed packet trace",
    "source": "^7^O_{F2}|E",
    "context": "A trainer gives junior engineers a fictional packet-delivery exercise with three labeled cards: a request, an acknowledgement, and a retry after a missing acknowledgement. Learners first take apart a worked sequence, then repeatedly arrange and test the cards themselves. The selected CAS states describe these planned activities. They do not measure knowledge, retention, or learning effectiveness.",
    "steps": [
      {
        "title": "Change the activity",
        "text": "The learner [[operator]]. Include both a matching acknowledgement and an absent one across trials."
      },
      {
        "title": "Practice the rule",
        "text": "The learner [[domain]]. A trial consists of arranging cards and explaining whether a retry is permitted."
      },
      {
        "title": "Keep the purpose",
        "text": "The learner [[drive]]. Repetition alone does not establish understanding."
      },
      {
        "title": "Use a concrete manner",
        "text": "The learner [[register]]. The compiler changes the declared coordinates; the trainer must evaluate the learner's actual work."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^7",
        "color": "cyan",
        "name": "Operator: Rhythm",
        "phrase": "repeatedly works through packet-card trials with a missing or matching acknowledgement",
        "explanation": "Rhythm names repeated exposure or practice, without a measured learning rate.",
        "nodeId": "noetic:CO-7",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^O",
        "color": "emerald",
        "name": "Domain: Operational",
        "phrase": "performs the planned practice activity",
        "explanation": "Operational places the selected activity in doing the exercise.",
        "nodeId": "domain:O",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F2}",
        "color": "amber",
        "name": "Drive: Wisdom",
        "phrase": "seeks to understand the same acknowledgement rule through use",
        "explanation": "Wisdom keeps the same stated motive across the comparison.",
        "nodeId": "drive:F2",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|E",
        "color": "pink",
        "name": "Register: Embodied",
        "phrase": "physically arranges the cards and tests the next permitted move",
        "explanation": "Embodied is justified by the concrete handling and arrangement of cards. It is not a synonym for merely running software.",
        "nodeId": "register:E",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:O7_F2_E",
      "label": "O7_F2|E",
      "reading": "The learner repeatedly performs a concrete packet-card exercise in pursuit of understanding the acknowledgement rule."
    },
    "professional": {
      "field": "Engineering education",
      "use": "Designing instruction that connects an explicit explanation with a concrete practice activity.",
      "task": "Prepare one worked packet trace and one altered trace with the acknowledgement missing. Ask the learner to explain the field that links an acknowledgement to a request, then arrange the cards and justify a retry. Record the learner's actual answer separately. Compare the two CAS states to identify which activity the lesson plan currently represents.",
      "expectedOutput": "A valid compound CAS state with one state node and the four selected noetic, domain, drive, and register nodes. Change ^6^C to ^7^O and |A to |E, keeping F2. The selected state changes from analytical decomposition to repeated concrete practice; both are authored ways to pursue understanding.",
      "limits": "The packet protocol is a fictional teaching fixture, not a standards-conformant implementation. CAS does not run a network, grade the learner, infer learning gains, or validate a teaching method. The educational reference supports the lesson-design context, not the CAS mapping.",
      "sources": [
        {
          "title": "IES Practice Guide — Organizing Instruction and Study to Improve Student Learning",
          "url": "https://ies.ed.gov/ncee/wwc/practiceguide/1"
        }
      ],
      "comparison": "Change ^6^C to ^7^O and |A to |E, keeping F2. The selected state changes from analytical decomposition to repeated concrete practice; both are authored ways to pursue understanding."
    }
  },
  {
    "id": "professional-ai-evidence-review-exercise",
    "pairId": "professional-ai-evidence-review-exercise",
    "variant": "original",
    "kind": "exercise",
    "title": "Agent proposal and review map",
    "source": "board proposal_map {\n  node prompt: ^8^C_{F2}|A;\n  node policy: ^5^P_{F7}|T;\n  node proposal: ^9^C_{F5}|A;\n  cjt propose: CJT<prompt | policy => proposal> [beta=1, sat=1, cutoff=0.1];\n  probe candidate: proposal;\n}",
    "context": "A fictional retrieval assistant proposes that a customer can cancel without a fee. Its retrieved passage only states when a cancellation request may be submitted. The engineer must separate the passage, the proposed answer, and the missing support for the fee claim. This selected state represents one part of that review; the CAS expression does not read the passage or run the assistant.",
    "exerciseMapping": [
      {
        "notation": "board proposal_map",
        "meaning": "Names the declared board; it does not create or deploy an application."
      },
      {
        "notation": "prompt: ^8^C_{F2}|A",
        "meaning": "A cognitive trigger oriented toward understanding, described analytically. This is an authored role for a question, not deduction."
      },
      {
        "notation": "policy: ^5^P_{F7}|T",
        "meaning": "An accumulated set of policy ideas at a principled level, oriented toward purpose and high-level integration; a declared bias role, not an enforced policy engine."
      },
      {
        "notation": "proposal: ^9^C_{F5}|A",
        "meaning": "The candidate idea surfaced at the cognitive level, with declared Agency motive and Analytical manner."
      },
      {
        "notation": "reviewed_candidate: ^9^E_{F6}|A",
        "meaning": "The candidate considered at an evaluative level, with Structure motive and Analytical manner. Its name does not certify that a review happened."
      },
      {
        "notation": "CJT<cause | bias => effect>",
        "meaning": "Declares a component with cause, bias, and effect terminals. The component's cause terminal may reference a ^9 state; the terminal role and the noetic coordinate are different concepts."
      },
      {
        "notation": "beta=1, sat=1, cutoff=0.1",
        "meaning": "Explicit declared parameters; check mode performs no scalar simulation and these are not calibrated AI parameters."
      },
      {
        "notation": "probe candidate",
        "meaning": "Names a point to inspect. In check mode it is attachment metadata, not an observation collected from a model."
      }
    ],
    "changes": "Add the second CJT and reviewed_candidate node, then move the probe from proposal to reviewed_candidate.",
    "question": "Compare the exact results and the assumptions you declared.",
    "professional": {
      "field": "AI engineering",
      "use": "Declare named proposal and review roles before implementing any AI workflow. The output is a static graph, not evidence retrieval or an executing agent.",
      "task": [
        "Create a three-column review record: exact source passage, proposed claim, and the test or citation needed to support it. Mark the unsupported fee claim for follow-up. Compare the two states, then run the companion CCDL map to inspect where a second declared review stage would sit.",
        "Add the second CJT and reviewed_candidate node, then move the probe from proposal to reviewed_candidate."
      ],
      "expectedOutput": "Original: three named nets, one CJT, two declared terminal edges. Variation: four named nets, two CJTs, four declared terminal edges. Both should pass the supported structural checks without supplying inputs.",
      "limits": "No LLM call, retrieval, claim checking, policy enforcement, or answer generation occurs. Structural admissibility is narrower than a complete PCBA or electrical simulation.",
      "sources": [
        {
          "title": "NIST AI RMF 1.0 — MAP and MEASURE",
          "url": "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf"
        }
      ]
    }
  },
  {
    "id": "professional-ai-evidence-review-exercise-variation",
    "pairId": "professional-ai-evidence-review-exercise",
    "variant": "variation",
    "kind": "exercise",
    "title": "Agent proposal and review map",
    "source": "board proposal_map {\n  node prompt: ^8^C_{F2}|A;\n  node policy: ^5^P_{F7}|T;\n  node proposal: ^9^C_{F5}|A;\n  node reviewed_candidate: ^9^E_{F6}|A;\n  cjt propose: CJT<prompt | policy => proposal> [beta=1, sat=1, cutoff=0.1];\n  cjt review_gate: CJT<proposal | policy => reviewed_candidate> [beta=1, sat=1, cutoff=0.1];\n  probe candidate: reviewed_candidate;\n}",
    "context": "A fictional retrieval assistant proposes that a customer can cancel without a fee. Its retrieved passage only states when a cancellation request may be submitted. The engineer must separate the passage, the proposed answer, and the missing support for the fee claim. This selected state represents one part of that review; the CAS expression does not read the passage or run the assistant.",
    "exerciseMapping": [
      {
        "notation": "board proposal_map",
        "meaning": "Names the declared board; it does not create or deploy an application."
      },
      {
        "notation": "prompt: ^8^C_{F2}|A",
        "meaning": "A cognitive trigger oriented toward understanding, described analytically. This is an authored role for a question, not deduction."
      },
      {
        "notation": "policy: ^5^P_{F7}|T",
        "meaning": "An accumulated set of policy ideas at a principled level, oriented toward purpose and high-level integration; a declared bias role, not an enforced policy engine."
      },
      {
        "notation": "proposal: ^9^C_{F5}|A",
        "meaning": "The candidate idea surfaced at the cognitive level, with declared Agency motive and Analytical manner."
      },
      {
        "notation": "reviewed_candidate: ^9^E_{F6}|A",
        "meaning": "The candidate considered at an evaluative level, with Structure motive and Analytical manner. Its name does not certify that a review happened."
      },
      {
        "notation": "CJT<cause | bias => effect>",
        "meaning": "Declares a component with cause, bias, and effect terminals. The component's cause terminal may reference a ^9 state; the terminal role and the noetic coordinate are different concepts."
      },
      {
        "notation": "beta=1, sat=1, cutoff=0.1",
        "meaning": "Explicit declared parameters; check mode performs no scalar simulation and these are not calibrated AI parameters."
      },
      {
        "notation": "probe candidate",
        "meaning": "Names a point to inspect. In check mode it is attachment metadata, not an observation collected from a model."
      }
    ],
    "changes": "Add the second CJT and reviewed_candidate node, then move the probe from proposal to reviewed_candidate.",
    "question": "Compare the exact results and the assumptions you declared.",
    "professional": {
      "field": "AI engineering",
      "use": "Declare named proposal and review roles before implementing any AI workflow. The output is a static graph, not evidence retrieval or an executing agent.",
      "task": [
        "Create a three-column review record: exact source passage, proposed claim, and the test or citation needed to support it. Mark the unsupported fee claim for follow-up. Compare the two states, then run the companion CCDL map to inspect where a second declared review stage would sit.",
        "Add the second CJT and reviewed_candidate node, then move the probe from proposal to reviewed_candidate."
      ],
      "expectedOutput": "Original: three named nets, one CJT, two declared terminal edges. Variation: four named nets, two CJTs, four declared terminal edges. Both should pass the supported structural checks without supplying inputs.",
      "limits": "No LLM call, retrieval, claim checking, policy enforcement, or answer generation occurs. Structural admissibility is narrower than a complete PCBA or electrical simulation.",
      "sources": [
        {
          "title": "NIST AI RMF 1.0 — MAP and MEASURE",
          "url": "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf"
        }
      ]
    }
  },
  {
    "id": "professional-incident-assumptions-exercise",
    "pairId": "professional-incident-assumptions-exercise",
    "variant": "original",
    "kind": "exercise",
    "title": "Incident investigation relation map",
    "source": "let assumptions = ^5^C_{F6}|A;\nlet hypothesis_review = ^6^C_{F6}|A;\nlet test_activity = ^7^O_{F2}|E;\nRelationCluster{assumptions -> hypothesis_review, hypothesis_review -> test_activity}",
    "context": "In a fictional service incident, the working hypothesis says the connection pool is too small. A supplied test fixture says increasing the pool did not remove the timeout, while requests sharing one database key still stalled. The engineer must distinguish the team's inherited explanation from the work of examining that explanation. The fixture is invented for the lesson and is not a production observation.",
    "exerciseMapping": [
      {
        "notation": "let name = value",
        "meaning": "Binds a local symbolic value; this does not create a service, log source, or automated test."
      },
      {
        "notation": "assumptions: ^5^C_{F6}|A",
        "meaning": "Accumulated working ideas at the Cognitive level, motivated by Structure, expressed Analytically."
      },
      {
        "notation": "hypothesis_review: ^6^C_{F6}|A",
        "meaning": "Decomposing an explanation at the Cognitive level, with the same motive and manner."
      },
      {
        "notation": "test_activity: ^7^O_{F2}|E",
        "meaning": "A planned repeated hands-on test activity: Rhythm, Operational domain, Wisdom motive, Embodied manner. No test runs."
      },
      {
        "notation": "test_criteria: ^6^E_{F6}|A",
        "meaning": "Examining the criteria for judging a proposed test at the Evaluative level, motivated by Structure, expressed Analytically."
      },
      {
        "notation": "RelationCluster{...}",
        "meaning": "A finite collection of declared relations."
      },
      {
        "notation": "->",
        "meaning": "A directed symbolic relation between two supplied states, not a measured causal claim or elapsed-time edge."
      }
    ],
    "changes": "Insert test_criteria between hypothesis_review and test_activity. Replace the direct review-to-test relation with two relations through the evaluative criteria.",
    "question": "Compare the exact results and the assumptions you declared.",
    "professional": {
      "field": "Software engineering",
      "use": "Represent a proposed investigation plan and make the test criteria explicit before operational testing. Directed relations express the author's plan; they do not execute a test or reconstruct a timeline.",
      "task": [
        "Build a short hypothesis table with the pool-size explanation, the provided observations, and a controlled test for lock contention. Identify which observation would weaken each hypothesis. Compare the selected states and inspect the companion relation map before changing real service settings.",
        "Insert test_criteria between hypothesis_review and test_activity. Replace the direct review-to-test relation with two relations through the evaluative criteria."
      ],
      "expectedOutput": "The final relation cluster contains two directed relations in the original and three in the variation. The variation inserts ^6^E_{F6}|A between the cognitive review and operational test. This respects the supported C-to-E-to-O domain descent.",
      "limits": "This is a plan representation. It contains no production observations, timestamps, event ordering evidence, or root-cause proof. A return link from ^O to ^E is not expressible as an ordinary descending relation in this example; the compiler rejects it. The model does not invent a feedback mechanism.",
      "sources": [
        {
          "title": "Google SRE — Effective Troubleshooting",
          "url": "https://sre.google/sre-book/effective-troubleshooting/"
        }
      ]
    }
  },
  {
    "id": "professional-incident-assumptions-exercise-variation",
    "pairId": "professional-incident-assumptions-exercise",
    "variant": "variation",
    "kind": "exercise",
    "title": "Incident investigation relation map",
    "source": "let assumptions = ^5^C_{F6}|A;\nlet hypothesis_review = ^6^C_{F6}|A;\nlet test_activity = ^7^O_{F2}|E;\nlet test_criteria = ^6^E_{F6}|A;\nRelationCluster{assumptions -> hypothesis_review, hypothesis_review -> test_criteria, test_criteria -> test_activity}",
    "context": "In a fictional service incident, the working hypothesis says the connection pool is too small. A supplied test fixture says increasing the pool did not remove the timeout, while requests sharing one database key still stalled. The engineer must distinguish the team's inherited explanation from the work of examining that explanation. The fixture is invented for the lesson and is not a production observation.",
    "exerciseMapping": [
      {
        "notation": "let name = value",
        "meaning": "Binds a local symbolic value; this does not create a service, log source, or automated test."
      },
      {
        "notation": "assumptions: ^5^C_{F6}|A",
        "meaning": "Accumulated working ideas at the Cognitive level, motivated by Structure, expressed Analytically."
      },
      {
        "notation": "hypothesis_review: ^6^C_{F6}|A",
        "meaning": "Decomposing an explanation at the Cognitive level, with the same motive and manner."
      },
      {
        "notation": "test_activity: ^7^O_{F2}|E",
        "meaning": "A planned repeated hands-on test activity: Rhythm, Operational domain, Wisdom motive, Embodied manner. No test runs."
      },
      {
        "notation": "test_criteria: ^6^E_{F6}|A",
        "meaning": "Examining the criteria for judging a proposed test at the Evaluative level, motivated by Structure, expressed Analytically."
      },
      {
        "notation": "RelationCluster{...}",
        "meaning": "A finite collection of declared relations."
      },
      {
        "notation": "->",
        "meaning": "A directed symbolic relation between two supplied states, not a measured causal claim or elapsed-time edge."
      }
    ],
    "changes": "Insert test_criteria between hypothesis_review and test_activity. Replace the direct review-to-test relation with two relations through the evaluative criteria.",
    "question": "Compare the exact results and the assumptions you declared.",
    "professional": {
      "field": "Software engineering",
      "use": "Represent a proposed investigation plan and make the test criteria explicit before operational testing. Directed relations express the author's plan; they do not execute a test or reconstruct a timeline.",
      "task": [
        "Build a short hypothesis table with the pool-size explanation, the provided observations, and a controlled test for lock contention. Identify which observation would weaken each hypothesis. Compare the selected states and inspect the companion relation map before changing real service settings.",
        "Insert test_criteria between hypothesis_review and test_activity. Replace the direct review-to-test relation with two relations through the evaluative criteria."
      ],
      "expectedOutput": "The final relation cluster contains two directed relations in the original and three in the variation. The variation inserts ^6^E_{F6}|A between the cognitive review and operational test. This respects the supported C-to-E-to-O domain descent.",
      "limits": "This is a plan representation. It contains no production observations, timestamps, event ordering evidence, or root-cause proof. A return link from ^O to ^E is not expressible as an ordinary descending relation in this example; the compiler rejects it. The model does not invent a feedback mechanism.",
      "sources": [
        {
          "title": "Google SRE — Effective Troubleshooting",
          "url": "https://sre.google/sre-book/effective-troubleshooting/"
        }
      ]
    }
  },
  {
    "id": "professional-requirements-tradeoff-exercise",
    "pairId": "professional-requirements-tradeoff-exercise",
    "variant": "original",
    "kind": "exercise",
    "title": "Find an omitted review perspective",
    "source": "let required = StateVariantSet{^6^C_{F6}|A, ^6^E_{F7}|A, ^7^O_{F6}|A};\nlet represented = StateVariantSet{^6^C_{F6}|A, ^6^E_{F7}|A};\nlet missing = required setminus represented;\nTuple{missing, |missing|}",
    "context": "A fictional field-monitoring system has a parent requirement to preserve a usable warning when a communications link is unavailable. One proposal buffers readings locally; another shuts down transmission earlier to conserve its declared energy budget. The review must first decompose the requirements, then judge a proposal against the mission purpose. No reliability, energy, or safety value is measured in this lesson.",
    "exerciseMapping": [
      {
        "notation": "required",
        "meaning": "The author's three intended CAS perspectives. The name is not a requirements-management database."
      },
      {
        "notation": "represented",
        "meaning": "The perspectives explicitly included in this toy review plan."
      },
      {
        "notation": "^6^C_{F6}|A",
        "meaning": "Analytical decomposition of requirement structure at the Cognitive level."
      },
      {
        "notation": "^6^E_{F7}|A",
        "meaning": "Analytical examination of proposal parts in an evaluation directed toward mission Purpose."
      },
      {
        "notation": "^7^O_{F6}|A",
        "meaning": "A repeated Operational verification routine described Analytically and motivated by Structure. It represents planned work, not a test result."
      },
      {
        "notation": "StateVariantSet{...}",
        "meaning": "A set that preserves full state variants, including Drive and Register."
      },
      {
        "notation": "setminus",
        "meaning": "Returns members of the left set absent from the right set."
      },
      {
        "notation": "|missing|",
        "meaning": "The exact number of members in the missing set; these vertical bars are cardinality syntax, distinct from the |A register suffix."
      },
      {
        "notation": "Tuple{missing, |missing|}",
        "meaning": "Returns the missing set alongside its cardinality so the item and count can be inspected together."
      }
    ],
    "changes": "Add ^7^O_{F6}|A to represented while leaving required unchanged.",
    "question": "Compare the exact results and the assumptions you declared.",
    "professional": {
      "field": "Systems engineering",
      "use": "Use exact finite set difference to find a CAS perspective omitted from a declared review plan. This checks the supplied symbolic set, not the real requirements.",
      "task": [
        "Write a small trace table from the parent warning requirement to local buffering, stale-data indication, and a planned disconnected-link test. Then state the tradeoff question: which proposal preserves the required warning behavior? Use the companion set exercise to find a deliberately omitted CAS perspective, while keeping the real requirement trace table as the engineering evidence.",
        "Add ^7^O_{F6}|A to represented while leaving required unchanged."
      ],
      "expectedOutput": "Original: missing contains only ^7^O_{F6}|A and cardinality 1. Variation: missing is empty and cardinality 0.",
      "limits": "An empty missing set shows only equality with this author-declared set of perspectives. It does not establish requirement completeness or verified behavior.",
      "sources": [
        {
          "title": "NASA Systems Engineering Handbook — Requirements Management",
          "url": "https://www.nasa.gov/reference/6-2-requirements-management/"
        }
      ]
    }
  },
  {
    "id": "professional-requirements-tradeoff-exercise-variation",
    "pairId": "professional-requirements-tradeoff-exercise",
    "variant": "variation",
    "kind": "exercise",
    "title": "Find an omitted review perspective",
    "source": "let required = StateVariantSet{^6^C_{F6}|A, ^6^E_{F7}|A, ^7^O_{F6}|A};\nlet represented = StateVariantSet{^6^C_{F6}|A, ^6^E_{F7}|A, ^7^O_{F6}|A};\nlet missing = required setminus represented;\nTuple{missing, |missing|}",
    "context": "A fictional field-monitoring system has a parent requirement to preserve a usable warning when a communications link is unavailable. One proposal buffers readings locally; another shuts down transmission earlier to conserve its declared energy budget. The review must first decompose the requirements, then judge a proposal against the mission purpose. No reliability, energy, or safety value is measured in this lesson.",
    "exerciseMapping": [
      {
        "notation": "required",
        "meaning": "The author's three intended CAS perspectives. The name is not a requirements-management database."
      },
      {
        "notation": "represented",
        "meaning": "The perspectives explicitly included in this toy review plan."
      },
      {
        "notation": "^6^C_{F6}|A",
        "meaning": "Analytical decomposition of requirement structure at the Cognitive level."
      },
      {
        "notation": "^6^E_{F7}|A",
        "meaning": "Analytical examination of proposal parts in an evaluation directed toward mission Purpose."
      },
      {
        "notation": "^7^O_{F6}|A",
        "meaning": "A repeated Operational verification routine described Analytically and motivated by Structure. It represents planned work, not a test result."
      },
      {
        "notation": "StateVariantSet{...}",
        "meaning": "A set that preserves full state variants, including Drive and Register."
      },
      {
        "notation": "setminus",
        "meaning": "Returns members of the left set absent from the right set."
      },
      {
        "notation": "|missing|",
        "meaning": "The exact number of members in the missing set; these vertical bars are cardinality syntax, distinct from the |A register suffix."
      },
      {
        "notation": "Tuple{missing, |missing|}",
        "meaning": "Returns the missing set alongside its cardinality so the item and count can be inspected together."
      }
    ],
    "changes": "Add ^7^O_{F6}|A to represented while leaving required unchanged.",
    "question": "Compare the exact results and the assumptions you declared.",
    "professional": {
      "field": "Systems engineering",
      "use": "Use exact finite set difference to find a CAS perspective omitted from a declared review plan. This checks the supplied symbolic set, not the real requirements.",
      "task": [
        "Write a small trace table from the parent warning requirement to local buffering, stale-data indication, and a planned disconnected-link test. Then state the tradeoff question: which proposal preserves the required warning behavior? Use the companion set exercise to find a deliberately omitted CAS perspective, while keeping the real requirement trace table as the engineering evidence.",
        "Add ^7^O_{F6}|A to represented while leaving required unchanged."
      ],
      "expectedOutput": "Original: missing contains only ^7^O_{F6}|A and cardinality 1. Variation: missing is empty and cardinality 0.",
      "limits": "An empty missing set shows only equality with this author-declared set of perspectives. It does not establish requirement completeness or verified behavior.",
      "sources": [
        {
          "title": "NASA Systems Engineering Handbook — Requirements Management",
          "url": "https://www.nasa.gov/reference/6-2-requirements-management/"
        }
      ]
    }
  },
  {
    "id": "professional-pipeline-propagation-exercise",
    "pairId": "professional-pipeline-propagation-exercise",
    "variant": "original",
    "kind": "exercise",
    "title": "Two-stage fixed-bias simulation",
    "source": "board pipeline_model {\n  input: stimulus;\n  output: answer;\n  node cause: ^8^C_{F5}|A;\n  node bias: ^5^P_{F7}|T;\n  node middle: ^9^C_{F5}|A;\n  node effect: ^9^C_{F5}|A;\n  cjt second_stage: CJT<middle | bias => effect> [beta=0.5, sat=0.9, cutoff=0.1];\n  cjt first_stage: CJT<cause | bias => middle> [beta=2, sat=0.75, cutoff=0.1];\n  probe observed: effect;\n}",
    "context": "An engineer sketches a fictional two-stage processing model before connecting any software or hardware. A supplied input stimulates the first stage; the second stage receives its computed value. The selected CAS state distinguishes a triggering idea from the idea brought to mind. The companion CCDL simulation is a separate, explicitly declared scalar model with fixed bias and exact inputs.",
    "exerciseMapping": [
      {
        "notation": "cause: ^8^C_{F5}|A",
        "meaning": "The analytically described, Agency-oriented cognitive trigger in the model."
      },
      {
        "notation": "middle and effect: ^9^C_{F5}|A",
        "meaning": "Two separate named nets with the same state coordinates. They remain distinct stage outputs."
      },
      {
        "notation": "bias: ^5^P_{F7}|T",
        "meaning": "A named principled context of accumulated ideas oriented toward Purpose, described in Transcendent register; the numeric bias is fixed at the explicitly supplied value 0.5."
      },
      {
        "notation": "first_stage and second_stage",
        "meaning": "CJT declarations evaluated by graph dependency: first_stage feeds middle, which feeds second_stage. Source declaration order is not the execution order."
      },
      {
        "notation": "beta",
        "meaning": "The cause multiplier in this selected scalar profile, not a trained-model parameter or measured electrical gain."
      },
      {
        "notation": "sat",
        "meaning": "The maximum output for the stage under this profile."
      },
      {
        "notation": "cutoff",
        "meaning": "The minimum bias for conduction; bias below it gives zero, while equality conducts."
      },
      {
        "notation": "profile: cas.pcba.scalar-fixed-bias/0.1",
        "meaning": "Selects the bounded rule: if bias < cutoff, output is 0; otherwise output = min(sat, beta × cause)."
      },
      {
        "notation": "input_bindings / output_bindings",
        "meaning": "Explicitly connects the stimulus port to cause and answer port to effect for this simulation."
      },
      {
        "notation": "initial_state",
        "meaning": "Supplies every named node's value and tick 0. The bias stays fixed; no dynamic bias update is inferred."
      },
      {
        "notation": "schedule and steps: 4",
        "meaning": "Four input samples and four logical ticks, with quoted decimal strings for numeric quantities. No physical time unit is supplied."
      },
      {
        "notation": "probe observed",
        "meaning": "Returns the explicitly simulated effect value; it is not a sensor or live production measurement."
      }
    ],
    "changes": "Change only the first_stage sat parameter from 0.75 to 0.50. Keep both betas, both cutoffs, the bias, and all input samples unchanged.",
    "question": "Compare the exact results and the assumptions you declared.",
    "professional": {
      "field": "Systems engineering",
      "use": "Compute a four-tick scalar trace under the supported fixed-bias profile. Compare a first-stage saturation assumption of 0.75 with 0.50.",
      "task": [
        "Before running the companion simulation, calculate both stage values for inputs 0.1, 0.5, 0, and 0.375. Compare the baseline first-stage saturation of 0.75 with a variation of 0.50. Explain which outputs change, then list what would need measurement before applying the model to a real processing system.",
        "Change only the first_stage sat parameter from 0.75 to 0.50. Keep both betas, both cutoffs, the bias, and all input samples unchanged."
      ],
      "expectedOutput": "For inputs 0.1, 0.5, 0, 0.375, original middle values are 0.2, 0.75, 0, 0.75 and answer values are 0.1, 0.375, 0, 0.375. Variation middle values are 0.2, 0.5, 0, 0.5 and answer values are 0.1, 0.25, 0, 0.25.",
      "limits": "No queue dynamics, time constants, electrical transient model, adaptive bias, gm behavior, real AI execution, or calibrated performance prediction is represented. The static checker reports W-PCBA-UNCONNECTED-IO for the separately declared ports. This does not cancel the explicit input/output bindings in the simulation profile; inspect the computed trace and its PASS status. The diagram remains a static netlist.",
      "sources": []
    }
  },
  {
    "id": "professional-pipeline-propagation-exercise-variation",
    "pairId": "professional-pipeline-propagation-exercise",
    "variant": "variation",
    "kind": "exercise",
    "title": "Two-stage fixed-bias simulation",
    "source": "board pipeline_model {\n  input: stimulus;\n  output: answer;\n  node cause: ^8^C_{F5}|A;\n  node bias: ^5^P_{F7}|T;\n  node middle: ^9^C_{F5}|A;\n  node effect: ^9^C_{F5}|A;\n  cjt second_stage: CJT<middle | bias => effect> [beta=0.5, sat=0.9, cutoff=0.1];\n  cjt first_stage: CJT<cause | bias => middle> [beta=2, sat=0.50, cutoff=0.1];\n  probe observed: effect;\n}",
    "context": "An engineer sketches a fictional two-stage processing model before connecting any software or hardware. A supplied input stimulates the first stage; the second stage receives its computed value. The selected CAS state distinguishes a triggering idea from the idea brought to mind. The companion CCDL simulation is a separate, explicitly declared scalar model with fixed bias and exact inputs.",
    "exerciseMapping": [
      {
        "notation": "cause: ^8^C_{F5}|A",
        "meaning": "The analytically described, Agency-oriented cognitive trigger in the model."
      },
      {
        "notation": "middle and effect: ^9^C_{F5}|A",
        "meaning": "Two separate named nets with the same state coordinates. They remain distinct stage outputs."
      },
      {
        "notation": "bias: ^5^P_{F7}|T",
        "meaning": "A named principled context of accumulated ideas oriented toward Purpose, described in Transcendent register; the numeric bias is fixed at the explicitly supplied value 0.5."
      },
      {
        "notation": "first_stage and second_stage",
        "meaning": "CJT declarations evaluated by graph dependency: first_stage feeds middle, which feeds second_stage. Source declaration order is not the execution order."
      },
      {
        "notation": "beta",
        "meaning": "The cause multiplier in this selected scalar profile, not a trained-model parameter or measured electrical gain."
      },
      {
        "notation": "sat",
        "meaning": "The maximum output for the stage under this profile."
      },
      {
        "notation": "cutoff",
        "meaning": "The minimum bias for conduction; bias below it gives zero, while equality conducts."
      },
      {
        "notation": "profile: cas.pcba.scalar-fixed-bias/0.1",
        "meaning": "Selects the bounded rule: if bias < cutoff, output is 0; otherwise output = min(sat, beta × cause)."
      },
      {
        "notation": "input_bindings / output_bindings",
        "meaning": "Explicitly connects the stimulus port to cause and answer port to effect for this simulation."
      },
      {
        "notation": "initial_state",
        "meaning": "Supplies every named node's value and tick 0. The bias stays fixed; no dynamic bias update is inferred."
      },
      {
        "notation": "schedule and steps: 4",
        "meaning": "Four input samples and four logical ticks, with quoted decimal strings for numeric quantities. No physical time unit is supplied."
      },
      {
        "notation": "probe observed",
        "meaning": "Returns the explicitly simulated effect value; it is not a sensor or live production measurement."
      }
    ],
    "changes": "Change only the first_stage sat parameter from 0.75 to 0.50. Keep both betas, both cutoffs, the bias, and all input samples unchanged.",
    "question": "Compare the exact results and the assumptions you declared.",
    "professional": {
      "field": "Systems engineering",
      "use": "Compute a four-tick scalar trace under the supported fixed-bias profile. Compare a first-stage saturation assumption of 0.75 with 0.50.",
      "task": [
        "Before running the companion simulation, calculate both stage values for inputs 0.1, 0.5, 0, and 0.375. Compare the baseline first-stage saturation of 0.75 with a variation of 0.50. Explain which outputs change, then list what would need measurement before applying the model to a real processing system.",
        "Change only the first_stage sat parameter from 0.75 to 0.50. Keep both betas, both cutoffs, the bias, and all input samples unchanged."
      ],
      "expectedOutput": "For inputs 0.1, 0.5, 0, 0.375, original middle values are 0.2, 0.75, 0, 0.75 and answer values are 0.1, 0.375, 0, 0.375. Variation middle values are 0.2, 0.5, 0, 0.5 and answer values are 0.1, 0.25, 0, 0.25.",
      "limits": "No queue dynamics, time constants, electrical transient model, adaptive bias, gm behavior, real AI execution, or calibrated performance prediction is represented. The static checker reports W-PCBA-UNCONNECTED-IO for the separately declared ports. This does not cancel the explicit input/output bindings in the simulation profile; inspect the computed trace and its PASS status. The diagram remains a static netlist.",
      "sources": []
    }
  },
  {
    "id": "professional-workflow-resources-exercise",
    "pairId": "professional-workflow-resources-exercise",
    "variant": "original",
    "kind": "exercise",
    "title": "CAS Ohm design-score comparison",
    "source": "let scale = ohm_scale(\"handoff-design-v1\", \"declared-drive\", \"declared-attention\");\nlet potential = ohm_drive(\"12\", scale, \"design\", \"example:handoff-drive-assumption\");\nlet resistance = ohm_constraint(\"4\", scale, \"design\", \"example:handoff-constraint-assumption\");\nohm_flow(potential, resistance)",
    "context": "A fictional operations team loses context when incident work changes hands. The proposed process uses a shared working record and a brief handoff routine. The selected state changes from awareness of the workflow to a repeated operational pattern. A separate CAS Ohm exercise explores an assumed drive-to-constraint ratio; its values are design scores, not measurements of people or productivity.",
    "exerciseMapping": [
      {
        "notation": "ohm_scale(id, drive_unit, attention_unit)",
        "meaning": "Declares one coherent ratio scale; its labels are user supplied and calibration is NOT_VERIFIED."
      },
      {
        "notation": "handoff-design-v1",
        "meaning": "An arbitrary local scale identity. It does not refer to a validated instrument."
      },
      {
        "notation": "declared-drive / declared-attention",
        "meaning": "Invented unit labels for this design exercise. The constraint unit is their ratio."
      },
      {
        "notation": "ohm_drive(\"12\", ...)",
        "meaning": "Declares the potential quantity 12. This Ohm quantity is distinct from a CAS state Drive coordinate such as F6 Structure."
      },
      {
        "notation": "ohm_constraint(\"4\", ...) or \"3\"",
        "meaning": "Declares a nonzero constraint on the same scale."
      },
      {
        "notation": "design",
        "meaning": "Provenance category stating that these numbers are design assumptions."
      },
      {
        "notation": "example:... references",
        "meaning": "Required provenance labels supplied by the author; they are not external evidence records."
      },
      {
        "notation": "ohm_flow(potential, resistance)",
        "meaning": "Computes attention = drive / constraint using exact nonnegative rational arithmetic."
      },
      {
        "notation": "let",
        "meaning": "Binds each local typed quantity so it can be used in the final calculation."
      }
    ],
    "changes": "Keep the scale and potential fixed. Change only the constraint from 4 to 3.",
    "question": "Compare the exact results and the assumptions you declared.",
    "professional": {
      "field": "Human factors and organizational learning",
      "use": "Calculate a declared drive-to-constraint ratio with explicit units, provenance, and unverified calibration. Compare constraint 4 with 3.",
      "task": [
        "Draft a handoff card containing current impact, working hypotheses, actions already tried, and the next owner. Compare awareness of the process with performing its repeated routine. Then change the companion constraint input from 4 to 3 and explain why the resulting change from 3 to 4 follows from the declared equation alone.",
        "Keep the scale and potential fixed. Change only the constraint from 4 to 3."
      ],
      "expectedOutput": "Original exact result 12/4 = 3 declared-attention units. Variation exact result 12/3 = 4 declared-attention units. Both retain the unverified user-declared scale and calculated output provenance.",
      "limits": "These outputs are not measurements of attention, workload, cognitive capacity, or productivity. A proposed process change has not been shown to change the constraint; the example merely changes an assumption.",
      "sources": [
        {
          "title": "Google SRE Workbook — Incident Response",
          "url": "https://sre.google/workbook/incident-response/"
        }
      ]
    }
  },
  {
    "id": "professional-workflow-resources-exercise-variation",
    "pairId": "professional-workflow-resources-exercise",
    "variant": "variation",
    "kind": "exercise",
    "title": "CAS Ohm design-score comparison",
    "source": "let scale = ohm_scale(\"handoff-design-v1\", \"declared-drive\", \"declared-attention\");\nlet potential = ohm_drive(\"12\", scale, \"design\", \"example:handoff-drive-assumption\");\nlet resistance = ohm_constraint(\"3\", scale, \"design\", \"example:handoff-constraint-assumption\");\nohm_flow(potential, resistance)",
    "context": "A fictional operations team loses context when incident work changes hands. The proposed process uses a shared working record and a brief handoff routine. The selected state changes from awareness of the workflow to a repeated operational pattern. A separate CAS Ohm exercise explores an assumed drive-to-constraint ratio; its values are design scores, not measurements of people or productivity.",
    "exerciseMapping": [
      {
        "notation": "ohm_scale(id, drive_unit, attention_unit)",
        "meaning": "Declares one coherent ratio scale; its labels are user supplied and calibration is NOT_VERIFIED."
      },
      {
        "notation": "handoff-design-v1",
        "meaning": "An arbitrary local scale identity. It does not refer to a validated instrument."
      },
      {
        "notation": "declared-drive / declared-attention",
        "meaning": "Invented unit labels for this design exercise. The constraint unit is their ratio."
      },
      {
        "notation": "ohm_drive(\"12\", ...)",
        "meaning": "Declares the potential quantity 12. This Ohm quantity is distinct from a CAS state Drive coordinate such as F6 Structure."
      },
      {
        "notation": "ohm_constraint(\"4\", ...) or \"3\"",
        "meaning": "Declares a nonzero constraint on the same scale."
      },
      {
        "notation": "design",
        "meaning": "Provenance category stating that these numbers are design assumptions."
      },
      {
        "notation": "example:... references",
        "meaning": "Required provenance labels supplied by the author; they are not external evidence records."
      },
      {
        "notation": "ohm_flow(potential, resistance)",
        "meaning": "Computes attention = drive / constraint using exact nonnegative rational arithmetic."
      },
      {
        "notation": "let",
        "meaning": "Binds each local typed quantity so it can be used in the final calculation."
      }
    ],
    "changes": "Keep the scale and potential fixed. Change only the constraint from 4 to 3.",
    "question": "Compare the exact results and the assumptions you declared.",
    "professional": {
      "field": "Human factors and organizational learning",
      "use": "Calculate a declared drive-to-constraint ratio with explicit units, provenance, and unverified calibration. Compare constraint 4 with 3.",
      "task": [
        "Draft a handoff card containing current impact, working hypotheses, actions already tried, and the next owner. Compare awareness of the process with performing its repeated routine. Then change the companion constraint input from 4 to 3 and explain why the resulting change from 3 to 4 follows from the declared equation alone.",
        "Keep the scale and potential fixed. Change only the constraint from 4 to 3."
      ],
      "expectedOutput": "Original exact result 12/4 = 3 declared-attention units. Variation exact result 12/3 = 4 declared-attention units. Both retain the unverified user-declared scale and calculated output provenance.",
      "limits": "These outputs are not measurements of attention, workload, cognitive capacity, or productivity. A proposed process change has not been shown to change the constraint; the example merely changes an assumption.",
      "sources": [
        {
          "title": "Google SRE Workbook — Incident Response",
          "url": "https://sre.google/workbook/incident-response/"
        }
      ]
    }
  }
]);
