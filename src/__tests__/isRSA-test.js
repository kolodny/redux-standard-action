import { isRSA } from '../';

const type = 'ACTION_TYPE';

describe('isRSA()', () => {
  it('requires a type', () => {
    expect(isRSA({ type })).to.be.true;
    expect(isRSA({})).to.be.false;
  });

  it('only accepts plain objects', () => {
    const action = () => {};
    action.type = type;
    expect(isRSA(action)).to.be.false;
    const action2 = new function C() { this.type = type; };
    expect(isRSA(action2)).to.be.false;
  });

  it('handles error actions properly', () => {
    expect(isRSA({ type, error: true, payload: new Error() })).to.be.true;
    expect(isRSA({ type, error: true })).to.be.false;
    expect(isRSA({ type, payload: new Error() })).to.be.false;
  });

  it('returns false if there are invalid keys', () => {
    expect(isRSA({ type, payload: 'foobar' })).to.be.true;
    expect(isRSA({ type, meta: 'foobar' })).to.be.true;
    expect(isRSA({ type, extra: 'foobar' })).to.be.false;
  });
});
