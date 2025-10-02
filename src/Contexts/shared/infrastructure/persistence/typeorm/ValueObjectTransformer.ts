import { NewableClass } from '../../../domine/NewableClass';
import { ValueObject } from '../../../domine/value-object/ValueObject';

export const ValueObjectTransformer = (ValueObjectClass: NewableClass<ValueObject<any>>) => {
    return {
        to: (value: ValueObject<any>): any => value.value,
        from: (value: any): ValueObject<any> => new ValueObjectClass(value)
    };
};