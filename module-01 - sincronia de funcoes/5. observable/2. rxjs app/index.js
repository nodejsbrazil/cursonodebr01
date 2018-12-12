const Rx = require('rxjs');
const { switchMap, map, reduce, filter, from } = require('rxjs/operators');
const fs = require('fs');

const watch = dir =>
  Rx.Observable.create(observer => {
    fs.watch(dir, (eventType, filename) => {
      return observer.next({
        eventType,
        filename: `${dir}/${filename.toString()}`,
      });
    });
  });

const read = filename => Rx.bindNodeCallback(fs.readFile)(filename);

watch('./temp')
  .pipe(
    map(item => {
      console.log(item);
      return item;
    }),
  )
  .pipe(switchMap(e => read(e.filename)), map(JSON.parse))
  .pipe(switchMap(e => Rx.from(e)))
  .subscribe(
    e =>
      console.log(`
    Nome: ${e.nome},
    Idade: ${e.idade}
    `),
    error => console.error('deu ruim', error),
  );
