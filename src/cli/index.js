/**find and use the current module */
const program = require('commander');
const { prompt } = require('inquirer');
const { newDataPrompts } = require('./prompts');
const { datasLocation, getDatas, saveDatas } = require('./utils');

program.version('0.0.1').description('CLI with datas');

program
  .command('new')
  .alias('n')
  .description('Add a new data')
  .action(() => {
    prompt(newDataPrompts).then(
      ({ firstname, lastname, phonenumber, password }) => {
        const key = firstname + '' + lastname;
        const datas = getDatas();
        datas[key] = { firstname, lastname, phonenumber, password };

        saveDatas(datas);
      },
    );
  });

program
  .command('list')
  .alias('l')
  .description('list all datas')
  .action(() => {
    const datas = getDatas();
    prompt([
      {
        type: 'list',
        name: 'selected',
        message: 'Select a data',
        choices: Object.keys(datas),
      },
    ]).then(({ selected }) => {
      const data = datas[selected];
      console.log(JSON.stringify(data, null, 2));
    });
  });

program
  .command('update')
  .alias('u')
  .description('Update for data')
  .action(() => {
    const datas = getDatas();
    //Question about select object needs to update
    prompt({
      type: 'list',
      name: 'selected',
      message: 'Select data to update',
      choices: Object.keys(datas),
    }).then(({ selected }) => {
      const selectKeyUpdate = Object.keys(datas[selected]);
      //Question about attribute was update of object updated
      prompt({
        type: 'list',
        name: 'key',
        message: 'Select attribute need to update',
        choices: selectKeyUpdate,
      }).then(({ key }) => {
        //Question about fill into infor to update
        prompt({
          name: `${key}`,
          message: `Fill up info to update (${key}) `,
        })
          .then(({ firstname, lastname, phonenumber }) => {
            //Filter trash objects
            const getFilter = [firstname, lastname, phonenumber].find(
              item => typeof item != 'undefined',
            );
            //Update data attribute object
            datas[selected][key] = getFilter;
            saveDatas(datas);
          })
          .then(err => {
            console.log(err);
            if (err) {
              console.log('Save data error!');
            }
            console.log(`Save successful!`);
          });
      });
    });
  });

program.parse(process.argv);
