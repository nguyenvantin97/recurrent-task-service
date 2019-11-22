import { prop, post, getModelForClass } from '@typegoose/typegoose';
import { LABEL_EVENT } from '../constants/events';
import localPubsub from '../pubsub/LocalPubsub';

@post<Label>('save', recurrentTask => {
  localPubsub.emit(LABEL_EVENT.CREATED, recurrentTask);
})
@post<Label>('findOneAndUpdate', updatedLabel => {
  localPubsub.emit(LABEL_EVENT.UPDATED, updatedLabel);
})
@post<Label>('remove', deletedLabel => {
  localPubsub.emit(LABEL_EVENT.DELETED, deletedLabel);
})
class Label {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public color!: string;
}

const LabelModel = getModelForClass(Label);

export { Label, LabelModel };

export default LabelModel;
