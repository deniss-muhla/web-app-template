/* eslint-disable */ export default {
    languageData: {
        plurals: function(n, ord) {
            var s = String(n).split('.'),
                v0 = !s[1],
                t0 = Number(s[0]) == n,
                n10 = t0 && s[0].slice(-1),
                n100 = t0 && s[0].slice(-2);
            if (ord)
                return n10 == 1 && n100 != 11
                    ? 'one'
                    : n10 == 2 && n100 != 12
                    ? 'two'
                    : n10 == 3 && n100 != 13
                    ? 'few'
                    : 'other';
            return n == 1 && v0 ? 'one' : 'other';
        }
    },
    messages: {
        Category: 'Category',
        Id: 'Id',
        Login: 'Login',
        Name: 'Name',
        Password: 'Password',
        'Project version: {version}': function(a) {
            return ['Project version: ', a('version')];
        },
        'View the source on GitHub': 'View the source on GitHub',
        'sign in': 'sign in'
    }
};
