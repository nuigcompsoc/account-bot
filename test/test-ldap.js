process.env.NODE_ENV = 'test';

let chai = require('chai');
const ldap = require('ldapjs');
const {prefix, token, ldapConfig, ldapFunctions, attributes, botcommands, botsummons, testing} = require('./config.json');
const fs = require('fs');


// client.bind sets up for authentication
describe('testBind', (uid=testing[0]) => {

    let testLdapClient = ldap.createClient({
        url: ldapConfig.url,
        reconnect: ldapConfig.reconnect,
        tlsOptions: {
            host: ldapConfig.tlsOptions.host,
            port: ldapConfig.tlsOptions.port,
            ca: [fs.readFileSync(ldapConfig.tlsOptions.caPath)]
        }
    });

    let testSearchOptions = {
        scope: 'sub',
        filter: '(uid='+uid+')',
        attributes: ['dn', 'sn', 'cn', attributes.email, attributes.id, attributes.studentnum]
    }


    testLdapClient.bind(ldapFunctions.bind, ldapFunctions.pw, function(err, res) {
       
        it('It should not throw an LDAPError', (done) => {
            chai.assert(err == new ldap.InvalidCredentialsError(), 'There ought not to be a binding error.');
            done();
        });
        
    });

    it('test', (done) => { 
        chai.assert("test" == "test", "This works!");
        done(); 
    });


});