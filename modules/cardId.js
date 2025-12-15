// Source - https://stackoverflow.com/a/3437139
// Posted by ggg, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-15, License - CC BY-SA 4.0

export class Id{
  static generate = () => {
    return Math.floor(Math.random() * 1000000000000).toString();
  };
}
