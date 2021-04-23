module.exports = (client, invite) => {
  const f = new Map();
  [...client.invites.entries()].forEach(is => {
    [...is[1].entries()].forEach(i => {
      if (i[0] == invite.code) return;
      f.set(i[0], {uses: i[1].uses});
    });
  });

  client.invites.set(invite.guild.id, f);
};
