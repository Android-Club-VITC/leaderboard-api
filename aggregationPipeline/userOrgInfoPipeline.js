module.exports = {
    getUsersAllOrgInfo(email) {
        return [
            {
                $match: {
                    email: email
                },
            },
            {
                $lookup: {
                    from: "organizations",
                    localField: "org.orgId",
                    foreignField: "_id",
                    as: "org_info"
                }
            },
            { $limit: 1 }            
        ];
    } 
}