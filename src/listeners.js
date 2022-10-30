import { logo, wallet, mwallet, app, mapp, net, mnet, about, mabout, team, mteam, service, mservice, MoBtn, admin, madmin, imprint, mimprint, terms, mterms, contact, mcontact, closeMob } from "./elements";

admin.style.opacity = 0;
madmin.style.opacity = 0;
// Navigation Listeners
admin.addEventListener("click", showAdmin);
madmin.addEventListener("click", showAdmin);
MoBtn.addEventListener("click", toggle);
closeMob.addEventListener("click", toggle);
wallet.addEventListener("click", openWallet);
app.addEventListener("click", openApp);
net.addEventListener("click", openNet);
about.addEventListener("click", openAbout);
service.addEventListener("click", openService);
team.addEventListener("click", openTeam);
mwallet.addEventListener("click", openWallet);
mapp.addEventListener("click", openApp);
mnet.addEventListener("click", openNet);
mabout.addEventListener("click", openAbout);
mservice.addEventListener("click", openService);
mteam.addEventListener("click", openTeam);
contact.addEventListener("click", openContact);
terms.addEventListener("click", openTerms);
imprint.addEventListener("click", openImprint);
mcontact.addEventListener("click", openContact);
mterms.addEventListener("click", openTerms);
mimprint.addEventListener("click", openImprint);
logo.addEventListener("click", openLanding);
