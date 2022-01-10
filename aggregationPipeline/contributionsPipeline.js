const calculateScorePipeline = require("./calculateScore");
const objectId = require("mongoose").Types.ObjectId;

module.exports = {
  getAllMemberContributionDetails(orgId) {
    return [
      {
        $match: {
          org: objectId(orgId),
        },
      },
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
              $unwind: {
                path: "$org",
              },
            },
            {
              $match: {
                "org.orgId": objectId(orgId),
              },
            },
            {
              $set: {
                department: "$org.department",
                member_type: "$org.member_type",
              },
            },
            {
              $project: {
                name: 1,
                socials: 1,
                avatar: 1,
                department: 1,
                member_type: 1,
                _id: 0,
              },
            },
          ],
          as: "member",
        },
      },
      ...calculateScorePipeline.calculateScore,
      {
        $sort: {
          score: -1,
          updatedAt: 1,
        },
      },
      {
        $unwind: {
          path: "$member"
        }
      },
      {
        $project: {
          _id: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          org: 0
        },
      },
    ];
  },
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
      $unwind: {
        path: "$member"
      }
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

  getMemberContributionDetails(email, orgId) {
    return [
      {
        $match: { email: email, org: objectId(orgId) },
      },
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
              $unwind: {
                path: "$org",
              },
            },
            {
              $match: {
                "org.orgId": objectId(orgId),
              },
            },
            {
              $set: {
                department: "$org.department",
                member_type: "$org.member_type",
              },
            },
            {
              $project: {
                name: 1,
                member_type: 1,
                department: 1,
                socials: 1,
                avatar: 1,
                _id: 0,
              },
            },
          ],
          as: "member",
        },
      },
      {
        $unwind: {
          path: "$member"
        }
      },
      {
        $project: {
          _id: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          org: 0
        },
      },
    ];
  },
};
