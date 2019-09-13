/* eslint-disable */ export default {
    languageData: {
        plurals: function(n, ord) {
            var s = String(n).split('.'),
                i = s[0],
                v0 = !s[1],
                i10 = i.slice(-1),
                i100 = i.slice(-2);
            if (ord) return 'other';
            return v0 && i10 == 1 && i100 != 11
                ? 'one'
                : v0 && i10 >= 2 && i10 <= 4 && (i100 < 12 || i100 > 14)
                ? 'few'
                : (v0 && i10 == 0) || (v0 && i10 >= 5 && i10 <= 9) || (v0 && i100 >= 11 && i100 <= 14)
                ? 'many'
                : 'other';
        }
    },
    messages: {
        Category: '\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F',
        Id: 'Id',
        Login: '\u041B\u043E\u0433\u0438\u043D',
        Name: '\u0418\u043C\u044F',
        Password: '\u041F\u0430\u0440\u043E\u043B\u044C',
        'Project version: {version}': function(a) {
            return ['Project version: ', a('version')];
        },
        'View the source on GitHub': 'View the source on GitHub',
        'sign in': '\u0432\u043E\u0439\u0442\u0438 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443'
    }
};
