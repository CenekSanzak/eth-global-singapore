// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, Vector } from 'near-sdk-js';
import {Tool} from "./model";
@NearBindgen({})
class AgentToolContract {
  
  static schema = {
    greeting: 'string',
    'tools': { class: Vector, value: Tool }
  };
  
  tools: Vector<Tool> = new Vector<Tool>("v-uid");
  greeting: string = 'Hello';

  @view({}) // This method is read-only and can be called for free
  get_greeting(): string {
    return this.greeting;
  }

  @call({}) // This method changes the state, for which it cost gas
  set_greeting({ greeting }: { greeting: string }): void {
    near.log(`Saving greeting ${greeting}`);
    this.greeting = greeting;
  }

  @call({}) 
  add_tool({ tool }: { tool: Tool }): void {
    tool.votes = 0;
    this.tools.push(tool);
  }

  @call({})
  upvote_tool({ id }: { id: number }): void {
    near.log(`Upvoting tool with id ${id}`);
    const tool = this.tools.get(id);
    near.log(`Tool: ${tool}`);
    tool.votes += 1;
    this.tools.replace(id, tool);
  }

  @view({})
  get_tools(): Tool[] {
    return this.tools.toArray();
  }

}