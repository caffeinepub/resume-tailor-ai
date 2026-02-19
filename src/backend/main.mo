import Text "mo:core/Text";
import List "mo:core/List";
import Order "mo:core/Order";
import Array "mo:core/Array";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  public type Resume = {
    name : Text;
    position : Text;
    summary : Text;
    education : [Text];
    workExperience : [Text];
    skills : [Text];
    certificates : [Text];
    languages : [Text];
  };

  let resumes = List.empty<Resume>();

  public type ScoredSkill = {
    skill : Text;
    score : Int;
  };

  module ScoredSkill {
    public func compare(a : ScoredSkill, b : ScoredSkill) : Order.Order {
      Int.compare(b.score, a.score);
    };
  };

  type SearchElement = {
    searchText : Text;
    resultText : Text;
  };

  func searchJobDescription(_searchElement : SearchElement, jobDescription : Text) : Bool {
    jobDescription.contains(#text(""));
  };

  public shared ({ caller }) func tailorResume(baseResume : Resume, jobDescription : Text) : async Resume {
    let tailoredWorkExperience = filterRelevantEntries(baseResume.workExperience, jobDescription);
    let tailoredSkills = tailorSkills(baseResume.skills, jobDescription);

    {
      baseResume with
      workExperience = tailoredWorkExperience;
      skills = tailoredSkills;
    };
  };

  public shared ({ caller }) func createResume(resume : Resume) : async () {
    resumes.add(resume);
  };

  func hasMatch(source : Text, target : Text) : Bool {
    source.contains(#text(target));
  };

  func tailorSkills(skills : [Text], jobDescription : Text) : [Text] {
    let scoredSkills = List.empty<ScoredSkill>();

    for (skill in skills.values()) {
      if (hasMatch(jobDescription, skill)) {
        scoredSkills.add({
          skill;
          score = 3;
        });
      } else {
        scoredSkills.add({
          skill;
          score = 1;
        });
      };
    };

    let sortedSkills = scoredSkills.toArray().sort();
    sortedSkills.map(func(x) { x.skill });
  };

  func filterRelevantEntries(entries : [Text], jobDescription : Text) : [Text] {
    let relevantEntries = List.empty<Text>();
    for (entry in entries.values()) {
      if (hasMatch(jobDescription, entry)) {
        relevantEntries.add(entry);
      };
    };
    relevantEntries.toArray();
  };
};
