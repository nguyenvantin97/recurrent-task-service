import { prop } from '@typegoose/typegoose';

class SimpleUser {
  @prop({ required: true })
  public uid!: string;

  @prop({ required: true })
  public name!: string;

  @prop()
  public email?: string;
}

export default SimpleUser;