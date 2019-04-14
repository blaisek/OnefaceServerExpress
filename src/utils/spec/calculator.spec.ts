import { describe, it } from 'mocha';
import { square, double } from '../calculator';
import * as chai from 'chai';
const expect = chai.expect;

describe('Calculator test suite', () => {

  it('Should square correctly', () => {
    const result = square(2);
    expect(result).equal(4);
  });

  it('Should double correctly', () => {
    const result = double(3);
    expect(result).equal(6);
  });

});

