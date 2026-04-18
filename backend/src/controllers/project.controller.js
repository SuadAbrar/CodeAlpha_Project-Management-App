import Project from "../models/project.model.js";
import User from "../models/user.model.js";

export const createProject = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const project = await Project.create({
    title,
    description,
    owner: req.user._id,
    members: [req.user._id],
  });

  res.status(201).json(project);
};

export const getProjects = async (req, res) => {
  const projects = await Project.find({ members: req.user._id }).populate(
    "owner",
    "name email",
  );
  res.json(projects);
};

export const getProject = async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId)
    .populate("owner", "name email")
    .populate("members", "name email");
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  //   const isMember = project.members.some(
  //     (memberId) => memberId.toString() === req.user._id.toString(),
  //   );
  const ownerId = project.owner?._id
    ? project.owner._id.toString()
    : project.owner.toString();
  const memberIds = project.members.map((member) =>
    member._id ? member._id.toString() : member.toString(),
  );
  const isMember = memberIds.includes(req.user._id.toString());

  if (ownerId !== req.user._id.toString() && !isMember) {
    return res
      .status(403)
      .json({ message: "Access denied. You are not a member of this project" });
  }

  res.json(project);
};

export const addMember = async (req, res) => {
  const { projectId } = req.params;
  const { email, userId } = req.body;

  if (!email && !userId) {
    return res
      .status(400)
      .json({ message: "Please provide email or userId to add a member" });
  }

  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const ownerId = project.owner?.toString();
  if (ownerId !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Only the project owner can add members" });
  }

  const member = email
    ? await User.findOne({ email: email.toLowerCase().trim() })
    : await User.findById(userId);

  if (!member) {
    return res.status(404).json({ message: "Member user not found" });
  }

  const memberId = member._id.toString();
  const isAlreadyMember = project.members.some(
    (memberRef) => memberRef.toString() === memberId,
  );

  if (isAlreadyMember) {
    return res
      .status(400)
      .json({ message: "User is already a project member" });
  }

  project.members.push(member._id);
  await project.save();

  res.json(project);
};
