const fetch = require('node-fetch');

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiJqWkhOZHQ4VTlHS1JMekVkaFZlVUVmbzVZcEF2TVEuLiIsImVuZHBvaW50IjoiaHR0cHM6XC9cL2RldjA5LmludGFjY3QuY29tXC91c2Vyc1wvamFtZXMud2FuZ1wvcHJvamVjdHMueWFtbHRyYWluaW5nbGFiXC9hcGlcL3YxXC9hcGlcLyIsImNsaWVudElkIjoiZDRmMmI2YjMxODE3NGI5YTYwYTcuSU5UQUNDVC5hcHAuc2FnZS5jb20iLCJjbnlJZCI6IllBTUxUcmFpbmluZ0NvbXBhbnkifQ.Sv_q4RbTU3z2zrQnHhBxDAge78tLtvJyWLaY6RxV8qw';
const endpoint = 'https://dev01.intacct.com/users/james.wang/projects.yamltraininglab/api/';

const Query = {
    journalentry: (root, {id}) => getJournalEntryByID(id),
    journalentries: () => getJournalEntryCollection(),
    department: (root, {id}) => getDepartmentByID(id),
    departments: () => getDepartmentCollection()
};

const Mutation = {
    createDepartment: (root, {input}) => createDepartment(input)
};

module.exports = { Query, Mutation };

async function getJournalEntryByID(id) {

    var requestOptions = {
        method: 'GET',
        headers: {
            'Authorization':    'Bearer ' + accessToken,
            'content-type':     'application/json'
        },
        redirect: 'follow'
    };

    const response = await fetch(endpoint + "v0/objects/journalentry/" + id, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));

    //   console.log(response);
      return response['ia::result'];
}

async function getJournalEntryCollection() {

    var raw = JSON.stringify({
        "object": "journalentry",
        "fields": [
          "id",
          "key",
          "txnNumber",
          "description",
          "journalSymbol",
          "module",
          "state"
        ],
        "orderBy": {
          "id": "asc"
        }
      });
      
    var requestOptions = {
        method: 'POST',
        headers: {
            'Authorization':    'Bearer ' + accessToken,
            'content-type':     'application/json'
        },
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch(endpoint + "v0/services/query", requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));

    //   console.log(response);
      return response['ia::result'];
}

async function getDepartmentByID(id) {

  var requestOptions = {
      method: 'GET',
      headers: {
          'Authorization':    'Bearer ' + accessToken,
          'content-type':     'application/json'
      },
      redirect: 'follow'
  };

  const response = await fetch(endpoint + "v0/objects/department/" + id, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

  //   console.log(response);
    return response['ia::result'];
}

async function getDepartmentCollection() {

    var raw = JSON.stringify({
        "object": "department",
        "fields": [
          "id",
          "key",
          "name",
          "status"
        ],
        "orderBy": {
          "id": "asc"
        }
      });
      
    var requestOptions = {
        method: 'POST',
        headers: {
            'Authorization':    'Bearer ' + accessToken,
            'content-type':     'application/json'
        },
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch(endpoint + "v0/services/query", requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));

    //   console.log(response);
      return response['ia::result'];
}

async function createDepartment(input) {
  
  var requestOptions = {
      method: 'POST',
      headers: {
          'Authorization':    'Bearer ' + accessToken,
          'content-type':     'application/json'
      },
      body: JSON.stringify(input),
      redirect: 'follow'
  };

  const response = await fetch(endpoint + "v0/objects/department", requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

    return getDepartmentByID(response['ia::result'].key);
}