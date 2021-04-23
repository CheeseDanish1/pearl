module.exports = (client, invite) => {
  const f = new Map();
  f.set(invite.code, {uses: invite.uses});
  [...client.invites.entries()].forEach(is => {
    [...is[1].entries()].forEach(i => {
      f.set(i[0], {uses: i[1].uses});
    });
  });

  client.invites.set(invite.guild.id, f);
};
