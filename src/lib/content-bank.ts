export interface RawSlideContent {
  type: "hook" | "content" | "code_breakdown" | "comparison" | "cta";
  title: string;
  body?: string | undefined;
  code?: string | undefined;
  compare?: { leftTitle: string; left: string; rightTitle: string; right: string };
}

export interface ContentBankEntry {
  topic: string;
  title: string;
  category: string;
  slides: RawSlideContent[];
}

export const CONTENT_BANK: ContentBankEntry[] = [
  {
    topic: "python data types",
    title: "Python Data Types",
    category: "PYTHON",
    slides: [
      {
        type: "hook",
        title: "Still confused by Python data types?",
        body: "7 slides that make mutability finally click.",
      },
      {
        type: "content",
        title: "Immutable vs Mutable",
        body: "int, float, str, tuple and frozenset never change in place. list, dict and set do — which is why they bite you inside functions.",
      },
      {
        type: "code_breakdown",
        title: "The classic mutable trap",
        code: "def add(item, bucket=[]):\n    bucket.append(item)\n    return bucket\n\nadd(1)  # [1]\nadd(2)  # [1, 2]  <- same list!",
      },
      {
        type: "content",
        title: "Everything is an object",
        body: "Variables are labels pointing at objects. id() shows the address, type() shows the class, and small ints are cached by CPython.",
      },
      {
        type: "comparison",
        title: "list vs tuple",
        compare: {
          leftTitle: "list",
          left: "Mutable\nSlower to hash\nGreat for queues\nappend / pop O(1)",
          rightTitle: "tuple",
          right: "Immutable\nHashable as keys\nGreat for records\nLower memory",
        },
      },
      {
        type: "code_breakdown",
        title: "Copy the right way",
        code: "import copy\n\nshallow = original.copy()\ndeep = copy.deepcopy(original)\n\n# shallow shares nested objects\n# deep duplicates the whole tree",
      },
      {
        type: "cta",
        title: "Save this for your next interview",
        body: "Follow for daily Python breakdowns.",
      },
    ],
  },
  {
    topic: "salesforce architecture",
    title: "Salesforce Architecture",
    category: "SALESFORCE",
    slides: [
      {
        type: "hook",
        title: "Salesforce architecture, explained without the jargon",
        body: "The multi-tenant model every admin should understand.",
      },
      {
        type: "content",
        title: "Multi-tenant by design",
        body: "One codebase, one infrastructure, thousands of orgs. Your metadata — not your tables — defines your app.",
      },
      {
        type: "content",
        title: "The metadata layer",
        body: "Objects, fields, flows and layouts are rows in a shared metadata store. That's why upgrades never break your customisations.",
      },
      {
        type: "comparison",
        title: "Declarative vs Apex",
        compare: {
          leftTitle: "Flow",
          left: "No code\nFast to ship\nAdmin-owned\nGovernor friendly",
          rightTitle: "Apex",
          right: "Full control\nBulk-safe logic\nDeveloper-owned\nNeeds test coverage",
        },
      },
      {
        type: "code_breakdown",
        title: "Bulkify or die",
        code: "for (Account a : Trigger.new) {\n    // never query in a loop\n}\nMap<Id, Contact> byId = new Map<Id, Contact>(\n    [SELECT Id FROM Contact WHERE AccountId IN :Trigger.newMap.keySet()]\n);",
      },
      {
        type: "content",
        title: "Order of execution",
        body: "Validation rules, before triggers, after triggers, assignment rules, workflow, then flows. Know it and debugging gets 10x easier.",
      },
      {
        type: "cta",
        title: "Save this before your next build",
        body: "Follow for weekly Salesforce deep dives.",
      },
    ],
  },
];

export function findEntry(topic: string): ContentBankEntry | undefined {
  const t = topic.toLowerCase().trim();
  return CONTENT_BANK.find((e) => t.includes(e.topic) || e.topic.includes(t));
}
