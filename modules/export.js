export const exportHandler = (name, rank, info, effect, power, id, date) => {
  const content = `Name: ${name}\nRank: ${rank}\nCard Info: ${info}\nCard Effect: ${effect}\nPower: ${power}\nId: ${id}\nDate: ${date}`;
  const filename = `${name}.txt`;

  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  URL.revokeObjectURL(link.href);
};