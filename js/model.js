/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  githubUser: "Saberalter3872",

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "seesiangyeo33@gmail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Skills screen ----
  skills: [
    { group: "Photography & Videography", items: [
      ["Photoshop · Lightroom · Darktable", 95], ["Premiere Pro · Davinci Resolve", 65], 
      ["After Effects", 40], ["Audition", 30],
      ["Canva", 100], ["Illustration · Clip Studio Paint · Sai · Krita", 70],
      ["Studio Set-up", 70], ["Social Media Management - Facebook · Instagram  · XiaoHongShu", 65],
      ["Video Editing", 80], ["Photography", 90], ["Subtitling", 70]
    ]},
    { group: "Mechanical & Cloud Engineering", items: [
      ["Node.js", 65], ["Solid Edge · SolidWorks", 70],
      ["Git & GitHub", 20], ["Bash · PowerShell", 15],
    ]},
    { group: "Office", items: [
      ["Word", 100], ["PowerPoint", 100], ["Excel", 90],
    ]},
    { group: "Spoken Languages", items: [
      ["English", 100], ["German (Deutsch: Level A2)", 30], ["Mandarin", 70],
    ]},
    { group: "Others", items: [
      ["Stage Lighting & Sound Design", 60], ["Drama Acting", 50], 
      ["Script Writing", 40], ["Diving: Basic Open Waters · Swimming: Swim Saver Silver", 70],
      ["Teakwondo: Black Belt Dan 1", 60], ["Aikido", 20], ["Stop Motion Animation", 20],
    ]},
    { group: "Working to learn", items: [
      ["Blender", 50], ["Arduino", 30], ["Cosplay Prop Making", 60],
    ]},
  ],

  // ---- Data fetching ----
  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};
