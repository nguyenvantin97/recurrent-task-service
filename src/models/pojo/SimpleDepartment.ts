import { prop } from '@typegoose/typegoose';

class SimpleDepartment {
  @prop({ required: true })
  public id!: string;

  @prop({ required: true })
  public name!: string;
}

export default SimpleDepartment;