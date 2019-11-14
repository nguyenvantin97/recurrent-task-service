import { prop, arrayProp, getModelForClass, Ref } from '@typegoose/typegoose';
import { Label } from './Label';
import RecurrentTaskStatus from './enums/RecurrentTaskStatus';
import SimpleUser from './pojo/SimpleUser';

class RecurrentTask {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ required: true })
  public creator!: SimpleUser;

  @arrayProp({ items: SimpleUser })
  public doers?: SimpleUser[];

  @prop()
  public reviewer?: SimpleUser;

  @arrayProp({ itemsRef: Label })
  public labelIDs: Ref<Label>[];

  @prop()
  public start?: Date;

  @prop()
  public finish?: Date;

  @prop()
  public due?: Date;

  @prop({ enum: RecurrentTaskStatus, default: RecurrentTaskStatus.PENDING }) 
  public status?: RecurrentTaskStatus;
}

const RecurrentTaskModel = getModelForClass(RecurrentTask);

export { RecurrentTask, RecurrentTaskModel };

export default RecurrentTaskModel;
