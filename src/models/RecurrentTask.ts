import { prop, arrayProp, getModelForClass, Ref } from '@typegoose/typegoose';
import { Label } from './Label';
import RecurrentTaskStatus from './enums/RecurrentTaskStatus';
import SimpleUser from './pojo/SimpleUser';
import SimpleDepartment from './pojo/SimpleDepartment';
import RecurrentTaskType from './enums/RecurrentTaskType';

class RecurrentTask {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ required: true })
  public creator!: SimpleUser;

  @prop()
  public doer?: SimpleUser;

  @arrayProp({ items: SimpleUser })
  public coDoers?: SimpleUser[];

  @prop()
  public reviewer?: SimpleUser;

  @prop()
  public department?: SimpleDepartment;

  @arrayProp({ items: SimpleDepartment })
  public coDepartments: SimpleDepartment[];

  @arrayProp({ itemsRef: Label })
  public labelIds: Ref<Label>[];

  @prop()
  public start?: Date;

  @prop()
  public finish?: Date;

  @prop()
  public due?: Date;

  @prop()
  public comment?: string;

  @prop({ enum: RecurrentTaskType })
  public type!: RecurrentTaskType;

  @prop({ min: 0, max: 100 })
  public percentComplete?: number;

  @prop({ enum: RecurrentTaskStatus, default: RecurrentTaskStatus.PENDING }) 
  public status?: RecurrentTaskStatus;
}

const RecurrentTaskModel = getModelForClass(RecurrentTask);

export { RecurrentTask, RecurrentTaskModel };

export default RecurrentTaskModel;
