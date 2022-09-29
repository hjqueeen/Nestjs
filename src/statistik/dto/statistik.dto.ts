export class VisitorDto {
  green_marker: number;
}

export class NewSubscriberDto {
  item: number;
  min: ValueObject;
  max: ValueObject;
}

export class ValueObject {
  value: number;
}
