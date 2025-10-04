import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowRight, Check, Sparkles, X, Camera, Upload, Zap, Target, Heart, TrendingUp } from 'lucide-react';

const PoseLibrary = () => {
  const [selectedPose, setSelectedPose] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [activeTab, setActiveTab] = useState('explore'); // explore, paths, ai

  const poses = [
    {
      id: 1,
      name: "Downward Facing Dog",
      sanskritName: "Adho Mukha Svanasana",
      type: "yoga",
      difficulty: "beginner",
      targetAreas: ["hamstrings", "shoulders", "calves", "spine"],
      poseFamily: "inversion",
      benefits: ["Stretches hamstrings and calves", "Strengthens arms and shoulders", "Energizes the body", "Relieves tension"],
      alignmentCues: ["Press firmly through hands", "Draw hips up and back", "Keep spine long", "Relax neck and shoulders"],
      modifications: ["Bend knees slightly if hamstrings are tight", "Use blocks under hands for wrist support"],
      warmUp: [4, 6],
      progressions: [2, 5],
      regressions: [3],
      similar: [5, 8],
      complementary: [4, 6]
    },
    {
      id: 2,
      name: "Three-Legged Dog",
      sanskritName: "Tri Pada Adho Mukha Svanasana",
      type: "yoga",
      difficulty: "intermediate",
      targetAreas: ["hamstrings", "shoulders", "hips", "core"],
      poseFamily: "inversion",
      benefits: ["Builds upon downward dog", "Improves balance", "Opens hips", "Strengthens core stability"],
      alignmentCues: ["Keep hips square", "Extend through lifted leg", "Maintain weight evenly in hands", "Engage core"],
      modifications: ["Keep lifted leg lower", "Bend standing leg knee"],
      warmUp: [1, 6, 4],
      progressions: [12],
      regressions: [1],
      similar: [12],
      complementary: [7, 9]
    },
    {
      id: 3,
      name: "Puppy Pose",
      sanskritName: "Uttana Shishosana",
      type: "yoga",
      difficulty: "beginner",
      targetAreas: ["shoulders", "spine", "arms"],
      poseFamily: "stretch",
      benefits: ["Gentle shoulder stretch", "Releases spine tension", "Calming for nervous system", "Heart opening"],
      alignmentCues: ["Walk hands forward", "Keep hips over knees", "Melt chest toward floor", "Forehead rests down"],
      modifications: ["Place blanket under knees", "Rest forehead on block"],
      warmUp: [4, 6],
      progressions: [1],
      regressions: [],
      similar: [4],
      complementary: [1, 6]
    },
    {
      id: 4,
      name: "Child's Pose",
      sanskritName: "Balasana",
      type: "yoga",
      difficulty: "beginner",
      targetAreas: ["hips", "lower back", "shoulders"],
      poseFamily: "resting",
      benefits: ["Deeply restful", "Gentle hip stretch", "Calms mind", "Releases back tension"],
      alignmentCues: ["Sit hips toward heels", "Extend arms forward or alongside body", "Rest forehead on mat", "Breathe into back body"],
      modifications: ["Place pillow between hips and heels", "Widen knees for belly space"],
      warmUp: [],
      progressions: [3],
      regressions: [],
      similar: [3],
      complementary: [1, 8]
    },
    {
      id: 5,
      name: "Dolphin Pose",
      sanskritName: "Ardha Pincha Mayurasana",
      type: "yoga",
      difficulty: "intermediate",
      targetAreas: ["shoulders", "core", "hamstrings", "arms"],
      poseFamily: "inversion",
      benefits: ["Strengthens shoulders and core", "Prepares for forearm balance", "Stretches hamstrings", "Builds upper body strength"],
      alignmentCues: ["Forearms parallel", "Press forearms firmly down", "Lift hips high", "Draw shoulders away from ears"],
      modifications: ["Bend knees generously", "Walk feet wider"],
      warmUp: [1, 4, 6],
      progressions: [13],
      regressions: [1],
      similar: [1, 13],
      complementary: [2, 7]
    },
    {
      id: 6,
      name: "Cat-Cow Stretch",
      sanskritName: "Marjaryasana-Bitilasana",
      type: "yoga",
      difficulty: "beginner",
      targetAreas: ["spine", "core", "neck"],
      poseFamily: "mobility",
      benefits: ["Spinal mobility", "Warms up spine", "Connects breath and movement", "Relieves back tension"],
      alignmentCues: ["Move with breath", "Cow: arch back, lift chest", "Cat: round spine, tuck chin", "Keep shoulders over wrists"],
      modifications: ["Use padding under knees", "Smaller range of motion"],
      warmUp: [],
      progressions: [8],
      regressions: [],
      similar: [8],
      complementary: [1, 4]
    },
    {
      id: 7,
      name: "Warrior II",
      sanskritName: "Virabhadrasana II",
      type: "yoga",
      difficulty: "beginner",
      targetAreas: ["legs", "hips", "core", "arms"],
      poseFamily: "standing",
      benefits: ["Builds leg strength", "Opens hips", "Improves stamina", "Enhances concentration"],
      alignmentCues: ["Front knee over ankle", "Back foot perpendicular", "Arms extend energetically", "Gaze over front hand"],
      modifications: ["Shorten stance", "Use wall for balance"],
      warmUp: [6, 10],
      progressions: [9, 11],
      regressions: [],
      similar: [9, 11],
      complementary: [2, 10]
    },
    {
      id: 8,
      name: "Thread the Needle",
      sanskritName: "Parsva Balasana",
      type: "yoga",
      difficulty: "beginner",
      targetAreas: ["shoulders", "upper back", "neck", "spine"],
      poseFamily: "twist",
      benefits: ["Releases shoulder tension", "Gentle spinal twist", "Opens chest", "Calming effect"],
      alignmentCues: ["Thread arm under body", "Rest shoulder and ear on mat", "Keep hips level", "Breathe into back ribs"],
      modifications: ["Use block under head", "Less rotation if sensitive"],
      warmUp: [4, 6],
      progressions: [6],
      regressions: [4],
      similar: [6],
      complementary: [4, 3]
    },
    {
      id: 9,
      name: "Extended Side Angle",
      sanskritName: "Utthita Parsvakonasana",
      type: "yoga",
      difficulty: "intermediate",
      targetAreas: ["legs", "hips", "obliques", "shoulders"],
      poseFamily: "standing",
      benefits: ["Strengthens legs deeply", "Stretches side body", "Opens hips and chest", "Builds endurance"],
      alignmentCues: ["Front knee tracks over ankle", "Extend through top arm", "Lengthen both sides of waist", "Ground through back foot"],
      modifications: ["Forearm on thigh instead of hand down", "Use block under bottom hand"],
      warmUp: [7, 10, 6],
      progressions: [11],
      regressions: [7],
      similar: [7, 11],
      complementary: [2, 10]
    },
    {
      id: 10,
      name: "Triangle Pose",
      sanskritName: "Trikonasana",
      type: "yoga",
      difficulty: "beginner",
      targetAreas: ["legs", "hips", "obliques", "hamstrings"],
      poseFamily: "standing",
      benefits: ["Stretches legs and hips", "Opens chest and shoulders", "Improves balance", "Energizing"],
      alignmentCues: ["Keep both legs straight", "Reach forward then down", "Stack shoulders", "Expand through chest"],
      modifications: ["Hand on block or shin", "Shorten stance"],
      warmUp: [6, 7],
      progressions: [9],
      regressions: [],
      similar: [7, 9],
      complementary: [7, 2]
    },
    {
      id: 11,
      name: "Half Moon Pose",
      sanskritName: "Ardha Chandrasana",
      type: "yoga",
      difficulty: "advanced",
      targetAreas: ["legs", "core", "balance", "hips"],
      poseFamily: "standing",
      benefits: ["Challenges balance", "Strengthens standing leg", "Opens hips", "Improves focus"],
      alignmentCues: ["Stack hips vertically", "Standing leg strong", "Extend through lifted leg", "Hand under shoulder or on block"],
      modifications: ["Use wall for support", "Keep top hand on hip"],
      warmUp: [7, 10, 9],
      progressions: [],
      regressions: [9, 10],
      similar: [9],
      complementary: [7, 10]
    },
    {
      id: 12,
      name: "Wild Thing",
      sanskritName: "Camatkarasana",
      type: "yoga",
      difficulty: "intermediate",
      targetAreas: ["chest", "shoulders", "hips", "core"],
      poseFamily: "backbend",
      benefits: ["Opens heart deeply", "Builds strength", "Expansive and energizing", "Improves flexibility"],
      alignmentCues: ["Flip from three-legged dog", "Land back foot behind", "Arch through chest", "Keep hips lifted"],
      modifications: ["Keep hips lower", "Back foot closer to supporting hand"],
      warmUp: [1, 2, 6],
      progressions: [],
      regressions: [2],
      similar: [2],
      complementary: [1, 4]
    },
    {
      id: 13,
      name: "Forearm Stand",
      sanskritName: "Pincha Mayurasana",
      type: "yoga",
      difficulty: "advanced",
      targetAreas: ["shoulders", "core", "balance", "arms"],
      poseFamily: "inversion",
      benefits: ["Builds tremendous upper body strength", "Improves balance", "Increases body awareness", "Energizing"],
      alignmentCues: ["Forearms parallel", "Engage core strongly", "Press forearms down", "Legs together and active"],
      modifications: ["Practice at wall", "Use strap around arms"],
      warmUp: [5, 1, 16],
      progressions: [],
      regressions: [5],
      similar: [5],
      complementary: [1, 5]
    },
    {
      id: 14,
      name: "Pilates Hundred",
      sanskritName: "",
      type: "pilates",
      difficulty: "beginner",
      targetAreas: ["core", "breath control"],
      poseFamily: "core",
      benefits: ["Warms up body", "Builds core endurance", "Improves breath coordination", "Energizes"],
      alignmentCues: ["Curl head and shoulders up", "Arms pump beside body", "Legs at tabletop or extended", "Breathe: 5 counts in, 5 counts out"],
      modifications: ["Keep head down", "Bend knees to tabletop"],
      warmUp: [],
      progressions: [15],
      regressions: [],
      similar: [15],
      complementary: [16, 17]
    },
    {
      id: 15,
      name: "Roll Up",
      sanskritName: "",
      type: "pilates",
      difficulty: "intermediate",
      targetAreas: ["core", "spine", "hip flexors"],
      poseFamily: "core",
      benefits: ["Strengthens entire core", "Spinal articulation", "Stretches hamstrings", "Improves control"],
      alignmentCues: ["Roll up vertebra by vertebra", "Reach arms forward", "Scoop abs in deeply", "Control the descent"],
      modifications: ["Bend knees slightly", "Use hands for assistance"],
      warmUp: [14, 6],
      progressions: [18],
      regressions: [14],
      similar: [18],
      complementary: [14, 17]
    },
    {
      id: 16,
      name: "Plank",
      sanskritName: "Phalakasana",
      type: "pilates",
      difficulty: "beginner",
      targetAreas: ["core", "shoulders", "arms"],
      poseFamily: "core",
      benefits: ["Full body strengthener", "Builds endurance", "Improves posture", "Core stability"],
      alignmentCues: ["Body in straight line", "Shoulders over wrists", "Engage core and glutes", "Press floor away"],
      modifications: ["Drop to knees", "Forearm plank"],
      warmUp: [6],
      progressions: [17],
      regressions: [],
      similar: [17],
      complementary: [14, 15]
    },
    {
      id: 17,
      name: "Side Plank",
      sanskritName: "Vasisthasana",
      type: "pilates",
      difficulty: "intermediate",
      targetAreas: ["obliques", "shoulders", "core", "balance"],
      poseFamily: "core",
      benefits: ["Strengthens obliques", "Improves lateral stability", "Challenges balance", "Wrist and shoulder strength"],
      alignmentCues: ["Stack feet and hips", "Lift hips high", "Top arm reaches up", "Body in straight line"],
      modifications: ["Bottom knee down", "Forearm down instead of hand"],
      warmUp: [16, 14],
      progressions: [],
      regressions: [16],
      similar: [16],
      complementary: [14, 16]
    },
    {
      id: 18,
      name: "Teaser",
      sanskritName: "",
      type: "pilates",
      difficulty: "advanced",
      targetAreas: ["core", "hip flexors", "balance"],
      poseFamily: "core",
      benefits: ["Ultimate core challenge", "Builds control and strength", "Improves balance", "Develops coordination"],
      alignmentCues: ["Balance on sit bones", "Legs and torso form V-shape", "Arms reach forward", "Maintain C-curve in spine"],
      modifications: ["Bend knees", "Hold legs for support"],
      warmUp: [14, 15, 16],
      progressions: [],
      regressions: [15],
      similar: [15],
      complementary: [14, 16]
    }
  ];

  const practicePaths = [
    {
      id: 'flexibility',
      name: 'Deep Flexibility Journey',
      description: 'Gradually open your body with progressive stretching sequences',
      duration: '8 weeks',
      color: 'from-blue-100 to-cyan-50',
      borderColor: 'border-blue-200',
      icon: '🌊',
      goalPose: 11,
      milestones: [10, 7, 9, 11]
    },
    {
      id: 'inversion',
      name: 'Inversion Mastery',
      description: 'Build strength and confidence for advanced inversions',
      duration: '12 weeks',
      color: 'from-purple-100 to-pink-50',
      borderColor: 'border-purple-200',
      icon: '🔄',
      goalPose: 13,
      milestones: [1, 5, 13]
    },
    {
      id: 'core',
      name: 'Core Power Path',
      description: 'Develop deep core strength through pilates fundamentals',
      duration: '6 weeks',
      color: 'from-amber-100 to-orange-50',
      borderColor: 'border-amber-200',
      icon: '⚡',
      goalPose: 18,
      milestones: [14, 16, 15, 17, 18]
    },
    {
      id: 'balance',
      name: 'Balance & Grace',
      description: 'Cultivate steadiness and poise in challenging poses',
      duration: '10 weeks',
      color: 'from-emerald-100 to-teal-50',
      borderColor: 'border-emerald-200',
      icon: '🦋',
      goalPose: 11,
      milestones: [7, 10, 9, 11]
    }
  ];

  const filteredPoses = useMemo(() => {
    return poses.filter(pose => {
      const matchesSearch = pose.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pose.sanskritName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pose.targetAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDifficulty = filterDifficulty === 'all' || pose.difficulty === filterDifficulty;
      const matchesType = filterType === 'all' || pose.type === filterType;
      return matchesSearch && matchesDifficulty && matchesType;
    });
  }, [searchTerm, filterDifficulty, filterType]);

  const getRecommendations = (pose) => {
    const findPoses = (ids) => ids.map(id => poses.find(p => p.id === id)).filter(Boolean);
    return {
      warmUp: findPoses(pose.warmUp || []),
      progressions: findPoses(pose.progressions),
      regressions: findPoses(pose.regressions),
      similar: findPoses(pose.similar),
      complementary: findPoses(pose.complementary)
    };
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'beginner': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'intermediate': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'advanced': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-stone-50 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-neutral-50 to-warmGray-50">
      {/* Serene Header */}
      <div className="bg-gradient-to-r from-stone-100/40 via-amber-50/30 to-stone-100/40 backdrop-blur-xl border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 mb-4 border-2 border-white shadow-sm">
              <span className="text-3xl">🧘</span>
            </div>
            <h1 className="text-5xl font-extralight text-stone-800 tracking-wide mb-3">Flow & Form</h1>
            <p className="text-stone-600 text-lg font-light max-w-2xl mx-auto leading-relaxed">
              Your mindful movement companion. Discover poses, build strength, find your flow.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${
                activeTab === 'explore'
                  ? 'bg-white text-stone-800 shadow-sm border border-stone-200'
                  : 'bg-transparent text-stone-600 hover:bg-white/50'
              }`}
            >
              Explore Poses
            </button>
            <button
              onClick={() => setActiveTab('paths')}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${
                activeTab === 'paths'
                  ? 'bg-white text-stone-800 shadow-sm border border-stone-200'
                  : 'bg-transparent text-stone-600 hover:bg-white/50'
              }`}
            >
              Practice Paths
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${
                activeTab === 'ai'
                  ? 'bg-white text-stone-800 shadow-sm border border-stone-200'
                  : 'bg-transparent text-stone-600 hover:bg-white/50'
              }`}
            >
              AI Coach
              <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs rounded-full border border-purple-200">Soon</span>
            </button>
          </div>

          {/* Search - Only show on explore tab */}
          {activeTab === 'explore' && (
            <div className="flex flex-col sm:flex-row gap-3 max-w-4xl mx-auto">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-amber-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search by pose name or target area..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-transparent text-stone-700 placeholder-stone-400 shadow-sm"
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="px-6 py-4 bg-white/80 backdrop-blur-sm border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-200 text-stone-700 shadow-sm"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-6 py-4 bg-white/80 backdrop-blur-sm border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-200 text-stone-700 shadow-sm"
                >
                  <option value="all">All Types</option>
                  <option value="yoga">Yoga</option>
                  <option value="pilates">Pilates</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* AI Coach Tab */}
        {activeTab === 'ai' && !selectedPose && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-stone-800 mb-4">AI-Powered Pose Analysis</h2>
              <p className="text-stone-600 text-lg font-light">Coming soon: Upload photos or use live camera feed for real-time guidance</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Upload Photo */}
              <div className="bg-gradient-to-br from-white to-stone-50 rounded-3xl border-2 border-dashed border-stone-300 p-12 text-center hover:border-amber-300 transition-all cursor-not-allowed opacity-60">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 mb-6">
                  <Upload className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-medium text-stone-800 mb-3">Upload Pose Photo</h3>
                <p className="text-stone-600 mb-6 leading-relaxed">AI will analyze your form and suggest improvements</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium border border-purple-200">
                  <Sparkles className="w-4 h-4" />
                  Coming Soon
                </div>
              </div>

              {/* Live Camera */}
              <div className="bg-gradient-to-br from-white to-stone-50 rounded-3xl border-2 border-dashed border-stone-300 p-12 text-center hover:border-amber-300 transition-all cursor-not-allowed opacity-60">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 mb-6">
                  <Camera className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-stone-800 mb-3">Live Camera Feed</h3>
                <p className="text-stone-600 mb-6 leading-relaxed">Real-time pose correction and alignment feedback</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                  <Zap className="w-4 h-4" />
                  Coming Soon
                </div>
              </div>
            </div>

            {/* Features Preview */}
            <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
              <h3 className="text-xl font-medium text-stone-800 mb-6">What's Coming:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-1">Pose Detection & Analysis</h4>
                    <p className="text-stone-600 text-sm">ML-powered keypoint detection to identify your current pose</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-1">Alignment Feedback</h4>
                    <p className="text-stone-600 text-sm">Real-time suggestions to improve your form and prevent injury</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-1">Smart Progressions</h4>
                    <p className="text-stone-600 text-sm">AI suggests next poses based on your current practice level</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 mb-1">Progress Tracking</h4>
                    <p className="text-stone-600 text-sm">Visual journey of your flexibility and strength improvements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Practice Paths Tab */}
        {activeTab === 'paths' && !selectedPose && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-stone-800 mb-4">Choose Your Path</h2>
              <p className="text-stone-600 text-lg font-light max-w-2xl mx-auto">
                Structured journeys designed to help you reach specific goals with progressive sequences
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {practicePaths.map(path => {
                const goalPose = poses.find(p => p.id === path.goalPose);
                return (
                  <div
                    key={path.id}
                    className={`bg-gradient-to-br ${path.color} rounded-3xl border-2 ${path.borderColor} p-8 hover:shadow-lg transition-all cursor-pointer group`}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-5xl mb-4">{path.icon}</div>
                      <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-stone-700 border border-stone-200">
                        {path.duration}
                      </span>
                    </div>
                    <h3 className="text-2xl font-medium text-stone-800 mb-3">{path.name}</h3>
                    <p className="text-stone-600 mb-6 leading-relaxed">{path.description}</p>
                    
                    <div className="mb-6">
                      <p className="text-sm font-medium text-stone-700 mb-3">Journey Milestones:</p>
                      <div className="flex flex-wrap gap-2">
                        {path.milestones.map((poseId, idx) => {
                          const milestonePose = poses.find(p => p.id === poseId);
                          return (
                            <div
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPose(milestonePose);
                              }}
                              className="px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-lg text-xs text-stone-700 hover:bg-white transition-all border border-white/80"
                            >
                              {idx + 1}. {milestonePose?.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {goalPose && (
                      <div className="pt-4 border-t border-stone-200/50">
                        <p className="text-sm text-stone-600 mb-2">Goal Pose:</p>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-stone-800">{goalPose.name}</span>
                          <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-stone-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Explore Poses Grid */}
        {activeTab === 'explore' && !selectedPose && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <p className="text-stone-600">
                {filteredPoses.length} {filteredPoses.length === 1 ? 'pose' : 'poses'} found
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPoses.map(pose => (
                <div
                  key={pose.id}
                  onClick={() => setSelectedPose(pose)}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-200 hover:border-amber-300 hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-medium text-stone-800 group-hover:text-amber-700 transition-colors mb-1">
                          {pose.name}
                        </h3>
                        {pose.sanskritName && (
                          <p className="text-sm text-stone-500 italic">{pose.sanskritName}</p>
                        )}
                      </div>
                      <ArrowRight className="w-5 h-5 text-stone-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(pose.difficulty)}`}>
                        {pose.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-stone-50 text-stone-700 capitalize border border-stone-200">
                        {pose.type}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-stone-600 uppercase tracking-wide">Target Areas</p>
                      <div className="flex flex-wrap gap-1.5">
                        {pose.targetAreas.slice(0, 4).map((area, idx) => (
                          <span key={idx} className="text-xs text-stone-600 bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-100">
                            {area}
                          </span>
                        ))}
                        {pose.targetAreas.length > 4 && (
                          <span className="text-xs text-stone-500 px-2 py-1">
                            +{pose.targetAreas.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Pose View */}
        {selectedPose && (
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => setSelectedPose(null)}
              className="mb-8 flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors group"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              <span>Back to {activeTab === 'paths' ? 'paths' : 'poses'}</span>
            </button>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
              {/* Pose Header */}
              <div className="bg-gradient-to-br from-amber-50/80 via-stone-50/80 to-amber-50/80 p-10 border-b border-stone-200">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getDifficultyColor(selectedPose.difficulty)}`}>
                    {selectedPose.difficulty}
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-white text-stone-700 capitalize border border-stone-200">
                    {selectedPose.type}
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-white text-stone-700 capitalize border border-stone-200">
                    {selectedPose.poseFamily}
                  </span>
                </div>
                <h2 className="text-4xl font-light text-stone-800 mb-3">{selectedPose.name}</h2>
                {selectedPose.sanskritName && (
                  <p className="text-xl text-stone-600 italic font-light">{selectedPose.sanskritName}</p>
                )}
              </div>

              <div className="p-10 space-y-10">
                {/* Target Areas */}
                <div>
                  <h3 className="text-xl font-medium text-stone-800 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-600" />
                    Target Areas
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedPose.targetAreas.map((area, idx) => (
                      <span key={idx} className="px-4 py-2 bg-gradient-to-br from-amber-50 to-orange-50 text-amber-800 rounded-xl text-sm font-medium capitalize border border-amber-200">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-xl font-medium text-stone-800 mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500" />
                    Benefits
                  </h3>
                  <ul className="space-y-3">
                    {selectedPose.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-stone-700 leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Alignment Cues */}
                <div>
                  <h3 className="text-xl font-medium text-stone-800 mb-4">Alignment Cues</h3>
                  <ul className="space-y-3">
                    {selectedPose.alignmentCues.map((cue, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex-shrink-0 mt-2.5" />
                        <span className="text-stone-700 leading-relaxed">{cue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modifications */}
                <div>
                  <h3 className="text-xl font-medium text-stone-800 mb-4">Modifications & Props</h3>
                  <div className="space-y-3">
                    {selectedPose.modifications.map((mod, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                        <p className="text-stone-700 leading-relaxed">{mod}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warm Up Sequence */}
                {(() => {
                  const recs = getRecommendations(selectedPose);
                  return (
                    <>
                      {recs.warmUp.length > 0 && (
                        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                          <h3 className="text-xl font-medium text-stone-800 mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-purple-600" />
                            Warm-Up Sequence
                          </h3>
                          <p className="text-stone-600 mb-4 text-sm">Prepare your body with these poses before attempting {selectedPose.name}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {recs.warmUp.map((p, idx) => (
                              <div
                                key={p.id}
                                onClick={() => setSelectedPose(p)}
                                className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 hover:border-purple-400 cursor-pointer transition-all hover:shadow-md group"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium text-sm flex-shrink-0">
                                    {idx + 1}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-stone-800 group-hover:text-purple-700 transition-colors truncate">{p.name}</p>
                                    <p className="text-xs text-stone-600 capitalize">{p.difficulty}</p>
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Journey Recommendations */}
                      <div className="space-y-6 pt-6 border-t border-stone-200">
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="w-6 h-6 text-amber-600" />
                          <h3 className="text-2xl font-light text-stone-800">Your Journey</h3>
                        </div>

                        {recs.progressions.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-stone-600 uppercase tracking-wide mb-4 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4" />
                              Level Up → Progressions
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {recs.progressions.map(p => (
                                <div
                                  key={p.id}
                                  onClick={() => setSelectedPose(p)}
                                  className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 hover:border-emerald-400 cursor-pointer transition-all hover:shadow-md group"
                                >
                                  <p className="font-medium text-stone-800 mb-2 group-hover:text-emerald-700 transition-colors">{p.name}</p>
                                  <div className="flex items-center justify-between">
                                    <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(p.difficulty)}`}>
                                      {p.difficulty}
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {recs.regressions.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-stone-600 uppercase tracking-wide mb-4">Build Foundation → Regressions</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {recs.regressions.map(p => (
                                <div
                                  key={p.id}
                                  onClick={() => setSelectedPose(p)}
                                  className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:border-blue-400 cursor-pointer transition-all hover:shadow-md group"
                                >
                                  <p className="font-medium text-stone-800 mb-2 group-hover:text-blue-700 transition-colors">{p.name}</p>
                                  <div className="flex items-center justify-between">
                                    <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(p.difficulty)}`}>
                                      {p.difficulty}
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {recs.similar.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-stone-600 uppercase tracking-wide mb-4">Similar Poses</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {recs.similar.map(p => (
                                <div
                                  key={p.id}
                                  onClick={() => setSelectedPose(p)}
                                  className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 hover:border-amber-400 cursor-pointer transition-all hover:shadow-md group"
                                >
                                  <p className="font-medium text-stone-800 mb-2 group-hover:text-amber-700 transition-colors">{p.name}</p>
                                  <div className="flex items-center justify-between">
                                    <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(p.difficulty)}`}>
                                      {p.difficulty}
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-amber-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {recs.complementary.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-stone-600 uppercase tracking-wide mb-4">Complementary Poses</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {recs.complementary.map(p => (
                                <div
                                  key={p.id}
                                  onClick={() => setSelectedPose(p)}
                                  className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:border-purple-400 cursor-pointer transition-all hover:shadow-md group"
                                >
                                  <p className="font-medium text-stone-800 mb-2 group-hover:text-purple-700 transition-colors">{p.name}</p>
                                  <div className="flex items-center justify-between">
                                    <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(p.difficulty)}`}>
                                      {p.difficulty}
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-purple-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Serene Footer */}
      <div className="bg-gradient-to-r from-stone-100/40 via-amber-50/30 to-stone-100/40 backdrop-blur-xl border-t border-stone-200/50 mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 text-center">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 mb-4 border-2 border-white shadow-sm">
              <span className="text-2xl">🧘</span>
            </div>
          </div>
          <p className="text-stone-600 font-light mb-2">Flow & Form</p>
          <p className="text-stone-500 text-sm font-light">Your journey, your pace • Created with mindfulness</p>
        </div>
      </div>
    </div>
  );
};

export default PoseLibrary;