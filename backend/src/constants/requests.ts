export const requestFields = {
  id: true,
  type: true,
  status: true,
  createdAt: true,
  notes: true,

  purchaseRequest: {
    select: {
      id: true,
      equipmentType: true,
      name: true,
      quantity: true,
      photo: true,
      specifications: true,
      costEstimation: true,
    },
  },
  loanRequest: {
    select: {
      id: true,
      quantity: true,
      startDate: true,
      endDate: true,
      equipment: {
        select: {
          id: true,
          name: true,
          category: {
            select: {
              id: true,
              name: true,
              type: true,
            },
          },
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          type: true,
        },
      },
    },
  },
  stage: {
    select: {
      id: true,
      company: true,
      companyEmail: true,
      companyPhone: true,
      supervisor: true,
      supervisorEmail: true,
      supervisorPhone: true,
      letter: true,
      country: true,
      startDate: true,
      endDate: true,
    },
  },
  mission: {
    select: {
      id: true,
      location: true,
      objective: true,
      country: true,
      startDate: true,
      endDate: true,
    },
  },
  scientificEvent: {
    select: {
      id: true,
      location: true,
      title: true,
      articlesAccepted: true,
      articleCover: true,
      startDate: true,
      endDate: true,
    },
  },
  articleRegistration: {
    select: {
      id: true,
      conference: true,
      amount: true,
    },
  },
};

export const extendRequestFields = {
  ...requestFields,
  user: {
    select: {
      id: true,
    },
  },
};
