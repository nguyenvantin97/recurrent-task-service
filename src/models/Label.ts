import { prop, getModelForClass } from '@typegoose/typegoose';

class Label {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public color!: string;
}

const LabelModel = getModelForClass(Label);

export { Label, LabelModel };

export default LabelModel;
