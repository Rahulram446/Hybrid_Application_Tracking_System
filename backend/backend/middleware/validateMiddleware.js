export const validateApplication = (req, res, next) => {
  const { applicantName, email, position, submittedBy } = req.body;

  if (!applicantName || !email || !position || !submittedBy) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  next();
};

export const validateStatusUpdate = (req, res, next) => {
  const { status } = req.body;
  const validStatus = ["Pending", "Under Review", "Approved", "Rejected"];

  if (!status || !validStatus.includes(status)) {
    return res
      .status(400)
      .json({ message: "Invalid or missing status value" });
  }
  next();
};
