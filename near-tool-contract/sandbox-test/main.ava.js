import anyTest from 'ava';
import { Worker , NEAR} from 'near-workspaces';
import { setDefaultResultOrder } from 'dns'; setDefaultResultOrder('ipv4first'); // temp fix for node >v17

/**
 *  @typedef {import('near-workspaces').NearAccount} NearAccount
 *  @type {import('ava').TestFn<{worker: Worker, accounts: Record<string, NearAccount>}>}
 */
const test = anyTest;

test.beforeEach(async t => {
  // Create sandbox
  const worker = t.context.worker = await Worker.init();

  // Deploy contractm
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('test-account' ,{
    initialBalance: NEAR.parse("30 N").toJSON(),
  });

  // Get wasm file path from package.json test script in folder above
  await contract.deploy(
    process.argv[2],
  );

  // Save state for test runs, it is unique for each test
  t.context.accounts = { root, contract };
});

test.afterEach.always(async (t) => {
  await t.context.worker.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

test('returns the default greeting', async (t) => {
  const { contract } = t.context.accounts;
  const greeting = await contract.view('get_greeting', {});
  t.is(greeting, 'Hello');
});

test('changes the greeting', async (t) => {
  const { root, contract } = t.context.accounts;
  await root.call(contract, 'set_greeting', { greeting: 'Howdy' });
  const greeting = await contract.view('get_greeting', {});
  t.is(greeting, 'Howdy');
});

test('Has empty list of tools', async (t) => {
  const { contract } = t.context.accounts;
  const tools = await contract.view('get_tools', {});
  t.deepEqual(tools, []);
})

test('Can add a tool', async (t) => {
  const { root, contract } = t.context.accounts;
  await root.call(contract, 'add_tool',{ tool:{ 
    query_url: 'https://example.com/tool',
    json_schema: "{}",
   }});
  const tools = await contract.view('get_tools', {});
  t.deepEqual(tools, [{ query_url: 'https://example.com/tool', json_schema: "{}", votes: 0 }]);
})


test('Can add a tool and vote', async (t) => {
  const { root, contract } = t.context.accounts;
  await root.call(contract, 'add_tool',{ tool:{ 
    query_url: 'https://example.com/tool',
    json_schema: "{}",
   }});
  await root.call(contract, 'upvote_tool',{ id: 0 });
  const tools = await contract.view('get_tools', {});
  t.deepEqual(tools, [{ query_url: 'https://example.com/tool', json_schema: "{}", votes: 1 }]);
})