module.exports = {
  getAllMemberContributionDetails: [
    {
      $lookup: {
        from: "members",
        let: {
          uid: "$member",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$uid"],
              },
            },
          },
          {
            $project: {
              name: 1,
              member_type: 1,
              department: 1,
              _id: 0,
            },
          },
        ],
        as: "member",
      },
    },
    {
      $unwind: {
        path: "$member",
      },
    },
    {
      $match: {
        "member.member_type": {
          $ne: "CORE",
        },
      },
    },
    {
      $sort: {
        score: -1,
        updatedAt: 1,
      },
    },
    {
      $project: {
        _id: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      },
    },
  ],
  getAllMemberPublicContributionDetails: [
    {
      $lookup: {
        from: "members",
        let: {
          uid: "$member",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$uid"],
              },
            },
          },
          {
            $project: {
              name: 1,
              member_type: 1,
              department: 1,
              _id: 0,
            },
          },
        ],
        as: "member",
      },
    },
    {
      $unwind: {
        path: "$member",
      },
    },
    {
      $match: {
        "member.member_type": {
          $ne: "CORE",
        },
      },
    },

    {
      $sort: {
        score: -1,
        updatedAt: 1,
      },
    },

    {
      $project: {
        _id: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        timeline: 0,
        email: 0,
        "member.member_type": 0,
        "member.department": 0,
      },
    },
  ],

  getMemberContributionDetails(email) {return [
    {
      $match: { "email": email }
    },
     { $lookup: {
        from: "members",
        let: {
          uid: "$member",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$uid"],
              },
            },
          },
          {
            $project: {
              name: 1,
              member_type: 1,
              department: 1,
              _id: 0,
            },
          },
        ],
        as: "member",
      },
    },
    {
      $unwind: {
        path: "$member",
      },
    },
    {
      $project: {
        _id: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      },
    },    
  ]}
};
