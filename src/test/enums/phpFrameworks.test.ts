import * as assert from 'assert';
import { PHPFramework } from '../../enums/phpFramework';

suite('phpFramework enum', () => {
    test('Symfony 5 value', () => {
        assert.equal(PHPFramework.Symfony5, 'Symfony 5');
    });
    test('Symfony 6 value', () => {
        assert.equal(PHPFramework.Symfony6, 'Symfony 6');
    });
    test('Symfony 7 value', () => {
        assert.equal(PHPFramework.Symfony7, 'Symfony 7');
    });
});