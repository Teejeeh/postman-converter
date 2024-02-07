import GlobalFunctions from '../globalFunctions';
import { mqApi } from '../../support/request/mqapi-requests';

describe('$method /$url', () => {
    it('$name', () => {
        mqApi
            .$method({
                url: `$raw_url`,
            })
            .expectOk()
            .then((response) => {
                $test
            });
    });
});