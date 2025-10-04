export class Expoerter{
  static ctcgExportHandler = (supertype, element, name, rank, info, effect, power, id, date) => {
    const content = `Superype: ${supertype}\nElement: ${element}\nName: ${name}\nRank: ${rank}\nCard Info: ${info}\nCard Effect: ${effect}\nPower: ${power}\nId: ${id}\nDate: ${date}`;
    const filename = `${name}.ctcg`;

    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    URL.revokeObjectURL(link.href);
  };

  static JSONExportHandler = (supertype, element, name, rank, info, effect, power, id, date) =>{
    const JSONFile = {
      Supertype: supertype,
      Element: element,
      Name: name,
      Rank: rank,
      CardInfo: info,
      CardEffect: effect,
      Power: power,
      Id: id,
      Date: date
    };

    const filename = `${name}.json`;

    const blob = new Blob([JSON.stringify(JSONFile, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    URL.revokeObjectURL(link.href);
  };
}
