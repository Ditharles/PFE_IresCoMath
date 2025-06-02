export const checkRole =
  (role: string[]) => (req: any, res: any, next: any) => {
    if (!role.includes(req.user.role)) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }
    next();
  };
