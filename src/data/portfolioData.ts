import { Project, ExplorationNote, TechnicalPillar } from '../types/portfolio';
import opticalSchematic from '../assets/images/optical_transfer_schematic_1792491056086.jpg';
import deepCnnSchematic from '../assets/images/deepcnn_model_schematic_1792491072455.jpg';
import aetherlinkScreenshot from '../assets/images/aetherlink_ui_screenshot_1792492353750.jpg';
import spamClassifierScreenshot from '../assets/images/spam_classifier_ui_screenshot_1792492368712.jpg';

export const PERSONAL_INFO = {
  name: 'Dhanjit Boro',
  title: 'Computer Science and Engineering Student',
  location: 'Kokrajhar, India',
  positioning: 'I build software, test ideas, and learn by making.',
  summary:
    'Focused on applied computer vision, optical data transfer, and systems programming. I believe in writing code to understand how machines actually execute work—from pixel buffers to lower-level networking.',
  github: 'https://github.com/dhanjit97',
  linkedin: 'https://www.linkedin.com/in/dhanjit-boro-073796261/',
  email: 'dhanjit992@gmail.com',
  publicReposCount: 14,
};

export const PROJECTS: Project[] = [
  {
    id: 'aetherlink',
    title: 'AetherLink: Optical QR Stream File Transfer',
    shortName: 'AetherLink',
    status: 'Prototype / Experiment',
    statusNote: 'Experimental optical data transfer pipeline (pinned repo)',
    headline: 'Air-gapped data transmission using high-frequency visual QR code streams.',
    problem:
      'Transferring files across air-gapped physical environments without enabling Bluetooth, Wi-Fi, or plugging in untrusted physical USB storage devices.',
    whatWasBuilt:
      'A multi-tier optical transmission prototype consisting of a TypeScript/React web sender that encodes binary payloads into compressed, sequentially sequenced dynamic QR codes rendered at high refresh rates, paired with a computer-vision camera capture receiver and Python pipeline for frame synchronization and bitstream reconstruction.',
    technicalDecisions: [
      'Visual stream over RF: Leveraged optical light propagation to ensure physical containment and zero electromagnetic radio emissions.',
      'Chunked sequence headers: Built frame-level CRC checksums, sequence indexes, and parity frames to survive camera dropped frames.',
      'React canvas rendering: Built a frame-locked canvas emitter to guarantee smooth 60–120 FPS frame transitions without UI thread blocking.',
    ],
    tradeoffsAndLessons:
      'Ambient lighting and camera exposure latency significantly influence frame recognition accuracy. Implemented adaptive contrast thresholds and optical sync markers to stabilize capture.',
    stack: ['TypeScript', 'React', 'Computer Vision', 'Python', 'QR Protocol'],
    repoUrl: 'https://github.com/dhanjit97/AetherLink-V1-QR-file-transfer-optical-transfer-',
    hasLiveDemo: false,
    featured: true,
    schematicImage: opticalSchematic,
    schematicCaption: 'Optical QR stream transmission pipeline: Encoder -> OLED/Display -> Optical Path -> CMOS Capture -> Frame Reassembly.',
    screenshotImage: aetherlinkScreenshot,
    screenshotCaption: 'Simulated Desktop Interface: High-frequency optical QR sender showing frame sequence counter, telemetry buffer, and visual sync fiducials.',
    architectureDetails: [
      {
        label: 'Payload Serialization',
        description: 'Binary data chunked into fixed-size byte packets with 16-bit CRC checksums and monotonic sequence headers.',
      },
      {
        label: 'Optical Modulation',
        description: 'Frame-locked rendering engine cycling high-density QR patterns through a high-frequency display buffer.',
      },
      {
        label: 'Computer Vision Demodulator',
        description: 'OpenCV perspective correction, corner finder fiducial alignment, and continuous visual stream decoding.',
      },
    ],
  },
  {
    id: 'spam-classification',
    title: 'Spam Classification App with DeepCNN',
    shortName: 'Spam Classifier',
    status: 'Prototype / Experiment',
    statusNote: 'Deep learning GUI application with model selection',
    headline: 'Desktop NLP classification leveraging 1D Convolutional Neural Networks on text tensors.',
    problem:
      'Evaluating whether 1D Convolutional Neural Networks can provide faster inference latency and strong feature extraction for text spam classification compared to recurrent networks.',
    whatWasBuilt:
      'A graphical desktop utility written in Python featuring DeepCNN model inference. Users can input or paste message corpora, switch between trained neural model checkpoints, and inspect classification confidence distributions in real time.',
    technicalDecisions: [
      '1D ConvNet architecture: Used multi-scale kernel filters (sizes 3, 4, 5) to capture n-gram character and token patterns simultaneously with minimal compute overhead.',
      'Model checkpoint switching: Designed a decoupled inference pipeline allowing dynamic hot-swapping of weights without restarting the GUI loop.',
      'Local-first computation: Runs inference entirely on local CPU tensors with zero cloud dependency.',
    ],
    tradeoffsAndLessons:
      'Token vocabulary limits can produce out-of-vocabulary classification degradation; character-level n-gram fallbacks helped smooth edge cases.',
    stack: ['Python', 'Deep Learning', 'DeepCNN', 'GUI', 'NLP'],
    repoUrl: 'https://github.com/dhanjit97',
    hasLiveDemo: false,
    featured: false,
    schematicImage: deepCnnSchematic,
    schematicCaption: '1D Deep Convolutional neural architecture: Token Vectors -> Multi-scale Conv1D Kernels -> Max-Pooling -> Dense Softmax.',
    screenshotImage: spamClassifierScreenshot,
    screenshotCaption: 'Simulated Desktop GUI: Python DeepCNN interface showing message input buffer, model selector dropdown, neural layer activation heatmap, and classification confidence meter.',
    architectureDetails: [
      {
        label: 'Token Embedding & Padding',
        description: 'Text preprocessing transforming arbitrary length strings into dense dimensional embedding matrices.',
      },
      {
        label: 'Convolutional Feature Extractors',
        description: 'Parallel 1D convolution layers capturing structural n-gram syntactic patterns.',
      },
      {
        label: 'Desktop Interface',
        description: 'Interactive GUI loop providing instant classification confidence score feedback and model selection.',
      },
    ],
  },
  {
    id: 'wordlist-generator',
    title: 'Wordlist Generator: Combinatorial Utility',
    shortName: 'Wordlist Generator',
    status: 'Shipped Utility',
    statusNote: 'Desktop tool with CustomTkinter GUI (1 GitHub Star)',
    headline: 'High-speed combinatorial password & pattern permutation utility.',
    problem:
      'Standard command-line wordlist scripts often crash on large permutations due to unbounded memory allocation or lack clear visual parameters.',
    whatWasBuilt:
      'A dedicated Python desktop application with a clean CustomTkinter interface. Generates structured combinatorial string variations, prefix/suffix permutations, and configurable number sequences with streaming file-write flushing.',
    technicalDecisions: [
      'Streaming memory generators: Implemented Python generator iterators to stream combinations straight to disk, preventing RAM exhaustion.',
      'Modern desktop UI: Built with CustomTkinter for dark/light themes and consistent high-DPI scaling across operating systems.',
      'Parametric constraints: Configurable min/max lengths, character set exclusions, and custom delimiter inserts.',
    ],
    tradeoffsAndLessons:
      'Disk I/O quickly becomes the primary bottleneck during billions-row generation; batching disk buffer writes increased throughput dramatically.',
    stack: ['Python', 'CustomTkinter', 'Combinatorics', 'Disk I/O'],
    repoUrl: 'https://github.com/dhanjit97/WordlistGenerator-Python',
    hasLiveDemo: false,
    featured: false,
    architectureDetails: [
      {
        label: 'Generator Pipeline',
        description: 'Memory-safe Cartesian product and permutation algorithms written as lazily evaluated iterators.',
      },
      {
        label: 'Buffered File Flusher',
        description: 'Buffered disk writing mechanism that batches string writes to minimize system call overhead.',
      },
    ],
  },
  {
    id: 'lab-management-system',
    title: 'Lab Management System (Forked)',
    shortName: 'Lab Management',
    status: 'Forked Project',
    statusNote: 'Forked tool; scheduling allocation with CSV storage',
    headline: 'Desktop scheduling allocation tool for computer lab resources and sessions.',
    problem:
      'Organizing laboratory session schedules and instructor assignments without complicated database setups.',
    whatWasBuilt:
      'A lightweight desktop application utilizing Python and Tkinter for managing lab slot reservations, tracking classroom availability, and maintaining auditable scheduling records stored directly in structured CSV files.',
    technicalDecisions: [
      'Flat-file persistence: Chose plain CSV structures for maximum portability and inspection without requiring database server setup.',
      'Tkinter form validation: Input validation on session time slots to prevent overlapping room bookings.',
      'Forked lineage: Forked from DhanjitBoro84/lab-management-system-using-python, maintained for academic lab coordination.',
    ],
    tradeoffsAndLessons:
      'CSV concurrency is limited if multiple instances write at once; for single-workstation lab coordinators, the simplicity proved reliable.',
    stack: ['Python', 'Tkinter', 'CSV Persistence', 'Desktop'],
    repoUrl: 'https://github.com/dhanjit97/lab-management-system-using-python',
    hasLiveDemo: false,
    featured: false,
    architectureDetails: [
      {
        label: 'Conflict Resolution',
        description: 'Checks scheduled room indices against requested time brackets to avoid double-booking.',
      },
      {
        label: 'Audit File Storage',
        description: 'Structured CSV record storage with export capability for lab supervisors.',
      },
    ],
  },
];

export const TECHNICAL_PILLARS: TechnicalPillar[] = [
  {
    number: '01',
    title: 'Computer Vision & Optical Streams',
    summary:
      'Investigating visual perception algorithms, camera sensor calibration, optical QR data modulation, and real-time frame feature tracking.',
    subtopics: ['Optical communication protocols', 'OpenCV image processing', 'Fiducial markers & perspective correction', 'Real-time camera pipelines'],
    practicalApplication: 'Engineered AetherLink optical transmission system and classroom attendance prototypes.',
  },
  {
    number: '02',
    title: 'Applied Machine Learning & DeepCNN',
    summary:
      'Applying convolutional architectures to text and sequential data, exploring tensor operations, and running lightweight local inference.',
    subtopics: ['1D Convolutional Neural Networks', 'Word & character tokenization', 'Multi-scale kernel feature extraction', 'Model checkpoint management'],
    practicalApplication: 'Built desktop classification GUI with hot-swappable trained model checkpoints.',
  },
  {
    number: '03',
    title: 'Systems & Native Desktop Engineering',
    summary:
      'Exploring how operating systems schedule processes, handle memory-mapped files, and manage low-level network sockets.',
    subtopics: ['C / C++ & Qt GUI architecture', 'Rust systems concepts', 'Linux networking & socket programming', 'Python CustomTkinter native tools'],
    practicalApplication: 'Developing desktop utilities with streaming I/O and experimenting with P2P networking protocols.',
  },
  {
    number: '04',
    title: 'Practical UI & Architectural Restraint',
    summary:
      'Designing interfaces that respect physical ergonomics, high contrast, typography hierarchy, and deliberate tactile feedback.',
    subtopics: ['Neo-brutalist tactile design systems', 'Accessible typography (WCAG AA)', 'Zero-pill metadata discipline', 'Three.js procedural spatial graphics'],
    practicalApplication: 'Crafting responsive, high-contrast engineering interfaces with zero unnecessary fluff.',
  },
];

export const FIELD_NOTES: ExplorationNote[] = [
  {
    id: 'cv-attendance',
    topic: 'Computer-Vision Classroom Attendance',
    category: 'Computer Vision / In Progress',
    status: 'Active Experiment',
    description:
      'Evaluating face detection and recognition from wide-angle classroom photos. Testing illumination invariance, distance distortion, and batch bounding-box extraction.',
    technicalFocus: 'Haar cascades, deep embedding distance metrics, and false-positive suppression.',
    hypothesis:
      'Testing whether wide-angle multi-face detection can achieve reliable recognition across varying classroom lighting conditions without requiring dedicated per-student calibration.',
    approach:
      'Combining Haar cascades for rapid coarse candidate detection with lightweight dlib deep face embedding vectors to maintain reasonable inference speed on commodity desktop CPUs.',
    currentStatusNote:
      'Sandbox testing with batch test imagery; evaluating occlusion sensitivity and distance limits for back-row seating.',
  },
  {
    id: 'cpp-qt',
    topic: 'Cross-Platform C++ / Qt Desktop Architecture',
    category: 'Desktop Engineering / In Progress',
    status: 'Architecture Study',
    description:
      'Exploring native C++ application structure with Qt signals and slots for responsive tooling with direct OS system call integration.',
    technicalFocus: 'Memory management, event dispatch loops, and compilation pipelines.',
    hypothesis:
      'Evaluating memory footprint and cold-start latency tradeoffs between native C++/Qt desktop binaries versus cross-platform web runtime abstractions.',
    approach:
      'Benchmarking Qt signal-slot dispatch latency, event queue starvation under heavy I/O, and cross-platform compilation matrices using CMake on Linux and Windows.',
    currentStatusNote:
      'Prototyping core UI scaffolding with sub-25MB RSS memory footprints; testing native file descriptor watchers.',
  },
  {
    id: 'rust-p2p',
    topic: 'Peer-to-Peer Networking in Rust',
    category: 'Systems & Protocols / In Progress',
    status: 'Active Experiment',
    description:
      'Experimenting with socket multiplexing, peer discovery, and local broadcast over LAN for decentralized file syncing without central coordinator servers.',
    technicalFocus: 'Rust async concurrency, UDP multicast beaconing, and protocol packet framing.',
    hypothesis:
      'Probing whether zero-configuration LAN peer discovery using UDP multicast beacons can establish deterministic peer-to-peer TCP byte streams without internet gateways.',
    approach:
      'Implementing binary framing headers with CRC-32 integrity verifications, asynchronous tokio I/O loops, and graceful connection reconnect backoffs.',
    currentStatusNote:
      'Local multi-node loopback testing active; verifying message deduplication and multicast socket permission rules across platforms.',
  },
  {
    id: 'commoncart',
    topic: 'CommonCart Multi-Vendor Redesign',
    category: 'Full-Stack Software / In Progress',
    status: 'Tooling Exploration',
    description:
      'Rethinking data models and inventory consistency across multi-merchant catalog schemas.',
    technicalFocus: 'Relational data integrity, cart reservation timeouts, and state management.',
    hypothesis:
      'Investigating transactional boundary isolation between multi-vendor stock levels and temporary cart reservation locks under concurrent checkout attempts.',
    approach:
      'Modeling schema constraints with optimistic concurrency tokens, short-lived Redis lock keys, and idempotent payment callback state machines.',
    currentStatusNote:
      'Schema modeling and migration benchmarking; evaluating foreign key partition strategies for separated merchant tenants.',
  },
];
