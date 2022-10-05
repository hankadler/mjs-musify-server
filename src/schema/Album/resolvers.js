const resolvers = {
  Query: {
    albums: async (parent, args, context) => {
      const { data } = await context.dataSources.api.get("albums");
      return data.albums;
    },

    album: async (parent, args, context) => {
      const { albumId } = args;
      const { data } = await context.dataSources.api.get(`albums/${albumId}`);
      return data.album;
    },
  },

  Mutation: {
    deleteAlbums: async (parent, args, context) => {
      const { data, error } = await context.dataSources.api.delete("albums");
      if (error) throw error;
      return data;
    },

    createAlbum: async (parent, { input }, context) => {
      const { data, error } = await context.dataSources.api.post("albums", input);
      if (error) throw error;
      return data.album;
    },

    updateAlbum: async (parent, { input }, context) => {
      const { albumId } = input;
      const { data, error } = await context.dataSources.api.patch(`albums/${albumId}`, input);
      if (error) throw error;
      return data.album;
    },

    deleteAlbum: async (parent, { input }, context) => {
      const { albumId } = input;
      const { data, error } = await context.dataSources.api.delete(`albums/${albumId}`);
      if (error) throw error;
      return data;
    }
  },

  Album: {
    songs: async (parent, args, context) => {
      const songIds = parent?.songIds || [];
      const { data } = await context.dataSources.api.get("songs");
      const songs = data?.songs || [];
      return songs.filter(({ _id }) => songIds.includes(_id)) || songs;
    }
  }
};

export default resolvers;
