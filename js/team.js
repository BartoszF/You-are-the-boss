function Team()
{
  for(var i=0;i<50;i++)
  {
    this.guys.push(new Person());
  }
}

Team.prototype.guys = [];