// Generated from frozen version11 be84d1634635781dcc6e8ba2787f55b8dbfd66dd.
// Nodes come from checked compiler artifacts; phrases are authored teaching interpretations.
import {PROFESSIONAL_LESSONS} from './professional-data.js';
function freeze(value) {
  if (value && typeof value === "object") { Object.values(value).forEach(freeze); Object.freeze(value); }
  return value;
}
export const LESSON_CONTEXTS = freeze([
  {
    "id": "relationships",
    "pairId": "relationships",
    "variant": "original",
    "title": "Relationships: Maya hears criticism from a friend",
    "source": "^3^E_{F4}|f",
    "context": "Maya has spent her Sunday making a poster for a neighborhood fundraiser. She sends it to Jon, a close friend who volunteered to help. He replies, “The headline is hard to read.” This is an invented teaching scene; Maya’s interpretation is stated explicitly so you can examine it.",
    "steps": [
      {
        "title": "What happens",
        "text": "Maya reads Jon’s message twice. He has commented on the headline; he has not said he rejects her."
      },
      {
        "title": "What she makes of it",
        "text": "Maya’s immediate appraisal is [[domain]]. She recoils from the criticism: [[operator]]."
      },
      {
        "title": "Why it matters and how it feels",
        "text": "She thinks, [[drive]]. Her experience is [[register]]."
      },
      {
        "title": "What she does",
        "text": "She closes the chat and leaves Jon’s message unanswered. The silence belongs to the story surrounding the state we are modeling."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^3",
        "color": "cyan",
        "name": "Operator: Negative",
        "phrase": "I do not want to hear this criticism",
        "explanation": "Maya is repelled by the idea of the criticism. ^3 identifies that aversion; it does not establish that Jon actually rejected her.",
        "nodeId": "noetic:CO-3",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^E",
        "color": "emerald",
        "name": "Domain: Evaluative",
        "phrase": "This means he is rejecting my work",
        "explanation": "This is Maya’s appraisal of what the message means. Evaluative locates the state in judgment and felt significance.",
        "nodeId": "domain:E",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F4}",
        "color": "amber",
        "name": "Drive: Connection",
        "phrase": "Jon is a close friend, and I want us to stay close",
        "explanation": "The relationship with this particular friend is what matters in this reading. F4 identifies Connection as the motive.",
        "nodeId": "drive:F4",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|f",
        "color": "pink",
        "name": "Register: Affective",
        "phrase": "I feel hurt and want to withdraw",
        "explanation": "Lowercase f marks the feeling-toned manner of the state. It describes the hurt; it does not order Maya to withdraw.",
        "nodeId": "register:f",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:E3_F4_f",
      "label": "E3_F4|f",
      "reading": "Read the complete expression as Maya’s aversion to the criticism, within her appraisal of it, with connection to Jon at stake and hurt in the foreground. It joins four descriptions of this selected moment. Jon’s words, Maya’s interpretation and her later silence remain distinct parts of the written account."
    }
  },
  {
    "id": "relationships-variation",
    "pairId": "relationships",
    "variant": "variation",
    "title": "Relationships: Maya hears criticism from a friend",
    "source": "^6^C_{F4}|A",
    "context": "In an alternative continuation, Maya pauses before closing the chat. She keeps the friendship important and examines what “hard to read” could mean. She then asks Jon which part of the headline is difficult to read.",
    "steps": [
      {
        "title": "A different way to process the same message",
        "text": "Maya thinks, [[operator]]. She [[domain]]."
      },
      {
        "title": "What stays important and how she reasons",
        "text": "Her motive remains [[drive]]. She [[register]]."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^6",
        "color": "cyan",
        "name": "Operator: Male",
        "phrase": "The complaint could involve the font size, contrast or wording",
        "explanation": "^6 concerns the ideas composing another idea. Maya unpacks the broad complaint into possible ingredients; Male is the canonical structural name.",
        "nodeId": "noetic:CO-6",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^C",
        "color": "emerald",
        "name": "Domain: Cognitive",
        "phrase": "compares those possible explanations in thought",
        "explanation": "The selected state is reasoning about the message, so it moves from appraisal (^E) to thought (^C).",
        "nodeId": "domain:C",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F4}",
        "color": "amber",
        "name": "Drive: Connection",
        "phrase": "I want to understand Jon and keep our friendship close",
        "explanation": "Connection stays F4. A new way of processing the comment can retain the same relationship motive.",
        "nodeId": "drive:F4",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|A",
        "color": "pink",
        "name": "Register: Analytical",
        "phrase": "checks each explanation against the poster before deciding",
        "explanation": "Capital A makes the reason-based, step-by-step approach explicit. This is an alternative reading, not a guaranteed emotional recovery.",
        "nodeId": "register:A",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:C6_F4_A",
      "label": "C6_F4|A",
      "reading": "The operator changes from aversion (^3) to unpacking (^6); the domain changes from evaluation (^E) to thought (^C); the register changes from feeling-toned (|f) to analytical (|A). Connection (F4) stays. The variation represents her examination of the comment; the compiler does not generate her question or Jon’s reply."
    }
  },
  {
    "id": "learning",
    "pairId": "learning",
    "variant": "original",
    "title": "Learning: Samira makes sense of equivalent fractions",
    "source": "^2^C_{F2}|A",
    "context": "Samira is taking an evening numeracy class. Her tutor Kai draws one pizza cut into halves and another cut into quarters. Samira has memorized that 1/2 equals 2/4, but wants the equality to make sense.",
    "steps": [
      {
        "title": "What happens",
        "text": "Kai shades one half of the first drawing and two quarters of the second. Samira notices that the shaded areas match."
      },
      {
        "title": "The idea she engages with",
        "text": "She thinks, [[operator]], and [[domain]]."
      },
      {
        "title": "Her motive and approach",
        "text": "She says, [[drive]]. She [[register]]."
      },
      {
        "title": "What she does next",
        "text": "Samira explains the two drawings back to Kai. The expression below selects her interested, reason-based engagement with the idea, rather than a test score or a complete learning process."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^2",
        "color": "cyan",
        "name": "Operator: Positive",
        "phrase": "I am drawn to this idea that two quarters make one half",
        "explanation": "Positive names Samira’s affinity for the idea. It does not mean the compiler has proved her understanding.",
        "nodeId": "noetic:CO-2",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^C",
        "color": "emerald",
        "name": "Domain: Cognitive",
        "phrase": "pictures the two equal areas in her mind",
        "explanation": "Cognitive locates the activity in a mental representation of the fractions.",
        "nodeId": "domain:C",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F2}",
        "color": "amber",
        "name": "Drive: Wisdom",
        "phrase": "I want to understand why these fractions are equal",
        "explanation": "F2 is Wisdom: seeking understanding is the stated motive. It is distinct from merely wanting to finish the worksheet.",
        "nodeId": "drive:F2",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|A",
        "color": "pink",
        "name": "Register: Analytical",
        "phrase": "compares the pieces step by step and explains why their areas match",
        "explanation": "Analytical describes the explicit comparison and reasoning used to engage with the idea.",
        "nodeId": "register:A",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:C2_F2_A",
      "label": "C2_F2|A",
      "reading": "The expression describes attraction toward a fraction idea in thought, motivated by understanding and expressed through analytical comparison. The operator tells you her relation to the idea; it is the story phrase about equal areas that supplies the particular idea being considered."
    }
  },
  {
    "id": "learning-variation",
    "pairId": "learning",
    "variant": "variation",
    "title": "Learning: Samira makes sense of equivalent fractions",
    "source": "^7^O_{F2}|E",
    "context": "Samira chooses a different learning activity for the following week. Each evening she uses paper circles to rehearse the same relationship between halves and quarters.",
    "steps": [
      {
        "title": "Repeated hands-on practice",
        "text": "For ten minutes each evening, she [[operator]]. She [[domain]]."
      },
      {
        "title": "The motive and manner of practice",
        "text": "She keeps the aim [[drive]], and [[register]]."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^7",
        "color": "cyan",
        "name": "Operator: Rhythm",
        "phrase": "returns to the same halves-and-quarters exercise",
        "explanation": "Rhythm names the recurring exposure to the idea. The daily schedule is supplied by the story; ^7 alone does not encode a clock time or duration.",
        "nodeId": "noetic:CO-7",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^O",
        "color": "emerald",
        "name": "Domain: Operational",
        "phrase": "folds, cuts and places the paper pieces",
        "explanation": "Operational locates this selected state in carrying out actions.",
        "nodeId": "domain:O",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F2}",
        "color": "amber",
        "name": "Drive: Wisdom",
        "phrase": "I want to understand why these fractions are equal",
        "explanation": "F2 stays the same: the activity changes while the motive remains understanding.",
        "nodeId": "drive:F2",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|E",
        "color": "pink",
        "name": "Register: Embodied",
        "phrase": "uses her hands and eyes to align the pieces",
        "explanation": "Embodied marks direct sensorimotor engagement. Capital |E is a register, whereas ^E would be the Evaluative domain.",
        "nodeId": "register:E",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:O7_F2_E",
      "label": "O7_F2|E",
      "reading": "^2^C becomes ^7^O: interest in a mental idea becomes a repeated action pattern. |A becomes |E: explaining the comparison becomes manipulating the pieces. Wisdom remains F2. Running either expression produces a description of the selected state; learning gains would need to be observed separately."
    }
  },
  {
    "id": "work",
    "pairId": "work",
    "variant": "original",
    "title": "Work: Alex organizes a community repair cafe",
    "source": "^6^C_{F6}|A",
    "context": "Alex coordinates a Saturday repair cafe at the library. Volunteers will help neighbors mend small household items. The team has said the event must be \"ready to open,\" but nobody has agreed what ready includes.",
    "steps": [
      {
        "title": "What happens",
        "text": "A volunteer asks Alex whether the team can announce the opening time. Alex pauses because the room booking and tool checks are still unclear."
      },
      {
        "title": "The idea he examines",
        "text": "Alex writes, [[operator]]. He [[domain]]."
      },
      {
        "title": "His motive and approach",
        "text": "His aim is [[drive]]. He [[register]]."
      },
      {
        "title": "What he does next",
        "text": "He gives each task an owner and asks for confirmation before sending the announcement. The expression selects his planning state; it does not encode the whole event or execute the plan."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^6",
        "color": "cyan",
        "name": "Operator: Male",
        "phrase": "Ready to open means a confirmed room, checked tools and briefed volunteers",
        "explanation": "Alex unpacks one idea into its component ideas. Male is the canonical name for this structure, not a reference to his gender.",
        "nodeId": "noetic:CO-6",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^C",
        "color": "emerald",
        "name": "Domain: Cognitive",
        "phrase": "holds the tasks and their dependencies together in thought",
        "explanation": "Cognitive locates the selected activity in Alex's mental plan.",
        "nodeId": "domain:C",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F6}",
        "color": "amber",
        "name": "Drive: Structure",
        "phrase": "I want clear roles and a dependable opening plan",
        "explanation": "The stated motive is organization and dependable form, so this reading uses Structure.",
        "nodeId": "drive:F6",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|A",
        "color": "pink",
        "name": "Register: Analytical",
        "phrase": "checks that the room is confirmed before setting the briefing time",
        "explanation": "The explicit dependency and sequence make his approach analytical.",
        "nodeId": "register:A",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:C6_F6_A",
      "label": "C6_F6|A",
      "reading": "This expression describes Alex unpacking the idea of readiness in thought, motivated by a dependable structure and using ordered reasoning. The room, tools and people come from the story; the expression identifies the kind of activity, domain, motive and manner."
    }
  },
  {
    "id": "work-variation",
    "pairId": "work",
    "variant": "variation",
    "title": "Work: Alex organizes a community repair cafe",
    "source": "^7^O_{F5}|E",
    "context": "On later Saturdays, Alex uses an established opening routine. He now focuses on getting the chosen activity underway rather than designing its organization.",
    "steps": [
      {
        "title": "A repeated opening routine",
        "text": "Every Saturday, Alex [[operator]]. He [[domain]]."
      },
      {
        "title": "A different immediate motive",
        "text": "He thinks, [[drive]]. He [[register]]."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^7",
        "color": "cyan",
        "name": "Operator: Rhythm",
        "phrase": "repeats the same check, count and setup sequence",
        "explanation": "Rhythm describes recurrent exposure through the routine. The Saturday timing is supplied by the story.",
        "nodeId": "noetic:CO-7",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^O",
        "color": "emerald",
        "name": "Domain: Operational",
        "phrase": "checks toolboxes, counts supplies and lays out the workstations",
        "explanation": "Operational places this state in carrying out the work.",
        "nodeId": "domain:O",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F5}",
        "color": "amber",
        "name": "Drive: Agency",
        "phrase": "I want to get the repair cafe open and put our chosen plan into action",
        "explanation": "The immediate motive has changed from designing order (F6) to chosen action (F5). The change is explicit rather than assumed.",
        "nodeId": "drive:F5",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|E",
        "color": "pink",
        "name": "Register: Embodied",
        "phrase": "uses his hands and eyes to inspect and arrange the equipment",
        "explanation": "Embodied describes the direct physical engagement of this selected moment.",
        "nodeId": "register:E",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:O7_F5_E",
      "label": "O7_F5|E",
      "reading": "^6^C becomes ^7^O as unpacking a plan becomes a recurring action. F6 changes to F5 because the story now emphasizes acting on the plan. |A becomes |E as reasoning about dependencies becomes hands-on setup. Neither expression schedules the volunteers or checks whether a tool is safe."
    }
  },
  {
    "id": "social-pressure",
    "pairId": "social-pressure",
    "variant": "original",
    "title": "Social pressure: Nia weighs a costly group invitation",
    "source": "^5^P_{F4}|f",
    "context": "Nia's friends suggest a weekend meal that costs $90. She has set aside $40 for the outing. Over years of family gatherings and friendships, she has absorbed the idea that being a good friend means accepting invitations.",
    "steps": [
      {
        "title": "What happens",
        "text": "The invitation arrives in the group chat. Nobody has threatened to exclude Nia, but she hesitates to mention the cost."
      },
      {
        "title": "The belief already present",
        "text": "She notices [[operator]]. She treats [[domain]]."
      },
      {
        "title": "Why the choice feels difficult",
        "text": "She thinks, [[drive]]. Her response is [[register]]."
      },
      {
        "title": "What she does",
        "text": "Nia types \"Sounds good\" and pauses before sending it. This expression selects the accumulated belief and its significance for her, not the whole chat or a prediction of what she will send."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^5",
        "color": "cyan",
        "name": "Operator: Female",
        "phrase": "the belief 'Good friends always say yes' has become part of how I see myself",
        "explanation": "Female names the ideas the mind is composed of. The scene describes an accumulated belief, not merely one incoming message and not Nia's gender.",
        "nodeId": "noetic:CO-5",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^P",
        "color": "emerald",
        "name": "Domain: Principled",
        "phrase": "saying yes as a rule for being a loyal friend",
        "explanation": "Principled places the belief among her guiding rules and identity.",
        "nodeId": "domain:P",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F4}",
        "color": "amber",
        "name": "Drive: Connection",
        "phrase": "I want to belong with these friends and keep our closeness",
        "explanation": "Connection is specifically her motive to remain close to this group.",
        "nodeId": "drive:F4",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|f",
        "color": "pink",
        "name": "Register: Affective",
        "phrase": "I feel guilty and anxious when I imagine declining",
        "explanation": "Affective marks the feeling-toned way the belief is present in this moment.",
        "nodeId": "register:f",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:P5_F4_f",
      "label": "P5_F4|f",
      "reading": "The expression describes a belief that has become part of Nia's outlook, operating as a guiding rule, motivated by connection and experienced through guilt and anxiety. The compiler identifies this supplied structure; the story explains which belief and which friends are involved."
    }
  },
  {
    "id": "social-pressure-variation",
    "pairId": "social-pressure",
    "variant": "variation",
    "title": "Social pressure: Nia weighs a costly group invitation",
    "source": "^6^C_{F5}|A",
    "context": "Nia pauses and separates the invitation into practical choices. She can care about the friendship while deciding how to use the money and time available to her.",
    "steps": [
      {
        "title": "Unpacking the choice",
        "text": "Nia writes, [[operator]]. She [[domain]]."
      },
      {
        "title": "Her motive and comparison",
        "text": "She says, [[drive]]. She [[register]]. After this review, she suggests a picnic within her budget. That suggestion is a possible continuation in the story."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^6",
        "color": "cyan",
        "name": "Operator: Male",
        "phrase": "This outing has separate parts: the meal price, travel cost and time together",
        "explanation": "She unpacks the idea of the outing into its component ideas.",
        "nodeId": "noetic:CO-6",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^C",
        "color": "emerald",
        "name": "Domain: Cognitive",
        "phrase": "considers those parts and possible alternatives in thought",
        "explanation": "Cognitive locates this selected state in considering the choice.",
        "nodeId": "domain:C",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F5}",
        "color": "amber",
        "name": "Drive: Agency",
        "phrase": "I want to choose an outing I can take part in with the means I have",
        "explanation": "Agency is the immediate motive: choosing and directing her own action. The story makes this shift from Connection explicit.",
        "nodeId": "drive:F5",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|A",
        "color": "pink",
        "name": "Register: Analytical",
        "phrase": "compares the $90 price with her $40 budget before proposing another option",
        "explanation": "Analytical describes the stated comparison and reasoning.",
        "nodeId": "register:A",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:C6_F5_A",
      "label": "C6_F5|A",
      "reading": "^5^P becomes ^6^C: an established guiding belief gives way to examining the parts of the choice. F4 becomes F5 as the immediate focus shifts from belonging to self-directed action. |f becomes |A as the selected state shifts from feeling to explicit comparison. This change does not predict her friends' response."
    }
  },
  {
    "id": "reflection",
    "pairId": "reflection",
    "variant": "original",
    "title": "Spiritual reflection: Ruth turns patience into a daily practice",
    "source": "^1^P_{F7}|T",
    "context": "After speaking impatiently to her father, Ruth sits quietly in the evening. In her spiritual reflection, she considers the value of caring for another person with patience. The scene uses Ruth's own stated meaning without assigning her a particular religious tradition.",
    "steps": [
      {
        "title": "What happens",
        "text": "Ruth remembers interrupting her father while he was telling a story. She notices a gap between that moment and the way she wants to treat him."
      },
      {
        "title": "What she brings to awareness",
        "text": "She [[operator]]. Her guiding value is [[domain]]."
      },
      {
        "title": "The purpose and wider view",
        "text": "She thinks, [[drive]]. She [[register]]."
      },
      {
        "title": "What she intends next",
        "text": "Ruth decides to listen more patiently during their next conversation. The expression selects her present awareness of a guiding intention; it does not verify a spiritual attainment or guarantee the later action."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^1",
        "color": "cyan",
        "name": "Operator: Mind",
        "phrase": "holds the intention to listen patiently in awareness",
        "explanation": "Mind names the awareness that takes in and processes the idea. The specific intention is supplied by the story.",
        "nodeId": "noetic:CO-1",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^P",
        "color": "emerald",
        "name": "Domain: Principled",
        "phrase": "Treat people with patience, including when I am tired",
        "explanation": "Principled locates the intention in a value she means to live by.",
        "nodeId": "domain:P",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F7}",
        "color": "amber",
        "name": "Drive: Purpose",
        "phrase": "I want my everyday care for my father to express what gives my life meaning",
        "explanation": "Purpose identifies the stated link between the moment and meaning in her life.",
        "nodeId": "drive:F7",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|T",
        "color": "pink",
        "name": "Register: Transcendent",
        "phrase": "relates this small moment to the wider kind of person she hopes to become",
        "explanation": "Transcendent is the broad, integrative, purpose-oriented register used here. It is a description within the framework, not proof of a supernatural event.",
        "nodeId": "register:T",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:P1_F7_T",
      "label": "P1_F7|T",
      "reading": "Read this as Ruth holding a guiding intention in awareness, motivated by purpose and considering it in a wider view of her life. The expression organizes her account of meaning; the words of the account make the particular intention and relationship clear."
    }
  },
  {
    "id": "reflection-variation",
    "pairId": "reflection",
    "variant": "variation",
    "title": "Spiritual reflection: Ruth turns patience into a daily practice",
    "source": "^7^O_{F7}|E",
    "context": "Ruth chooses a simple practice: after dinner each evening, she puts her phone aside, makes tea and spends ten minutes listening to her father.",
    "steps": [
      {
        "title": "The recurring practice",
        "text": "Each evening, she [[operator]]. She [[domain]]."
      },
      {
        "title": "The same purpose, expressed through action",
        "text": "Her purpose remains [[drive]]. She [[register]]."
      }
    ],
    "parts": [
      {
        "key": "operator",
        "token": "^7",
        "color": "cyan",
        "name": "Operator: Rhythm",
        "phrase": "returns to this listening practice after dinner",
        "explanation": "Rhythm names the repeated exposure and practice. The daily timing and ten-minute duration are details in the story.",
        "nodeId": "noetic:CO-7",
        "nodeKind": "noetic"
      },
      {
        "key": "domain",
        "token": "^O",
        "color": "emerald",
        "name": "Domain: Operational",
        "phrase": "sets down her phone, makes tea and sits with her father",
        "explanation": "Operational places the selected state in what she does.",
        "nodeId": "domain:O",
        "nodeKind": "domain"
      },
      {
        "key": "drive",
        "token": "_{F7}",
        "color": "amber",
        "name": "Drive: Purpose",
        "phrase": "I want my everyday care for my father to express what gives my life meaning",
        "explanation": "Purpose remains the same while her expression of it changes.",
        "nodeId": "drive:F7",
        "nodeKind": "drive"
      },
      {
        "key": "register",
        "token": "|E",
        "color": "pink",
        "name": "Register: Embodied",
        "phrase": "settles beside him, listens to his voice and stays physically present",
        "explanation": "Embodied describes direct sensory and physical participation in the practice.",
        "nodeId": "register:E",
        "nodeKind": "register"
      }
    ],
    "state": {
      "nodeId": "state:O7_F7_E",
      "label": "O7_F7|E",
      "reading": "^1^P becomes ^7^O as awareness of a principle becomes a recurring action. Purpose stays F7. |T becomes |E as broad reflection becomes direct physical participation. Whether this helps Ruth listen more patiently is a question for observing and reflecting on the practice."
    }
  }
].concat(PROFESSIONAL_LESSONS));
const byId = new Map(LESSON_CONTEXTS.map(lesson => [lesson.id, lesson]));
export function getLessonContext(id) { return byId.get(id) || null; }
