import { prop, arrayProp, getModelForClass } from '@typegoose/typegoose';
import SimpleUser from './pojo/SimpleUser';
import ResourceOperation from './enums/ResourceOperation';
import ResourceType from './enums/ResourceType';

class Log {
  @arrayProp({ required: true, items: String })
  public resourceIds!: string[];

  @prop({ required: true, enum: ResourceType })
  public resourceType: ResourceType;

  @prop({ required: true, enum: ResourceOperation })
  public operation!: ResourceOperation;

  @prop()
  public description?: string;

  @prop({ required: true })
  public executer!: SimpleUser;

  @prop({ default: new Date() })
  public timestamp?: Date;
}

const LogModel = getModelForClass(Log);

export { Log, LogModel };

export default LogModel;
