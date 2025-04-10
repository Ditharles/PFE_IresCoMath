export const checkRole =
  (role: string[]) => (req: any, res: any, next: any) => {
    if (!role.includes(req.user.role)) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  };
