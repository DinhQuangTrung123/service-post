// import { hasIn } from 'lodash';
// import { EXCEPTION_MESSAGE } from 'constant';
// import { GraphQLFormattedError } from 'custom-format-grapql.interface';

import { GraphQLFormattedError } from 'graphql';

export const graphqlErrorFormat = (error: GraphQLFormattedError) => {
  const graphQLFormattedError: GraphQLFormattedError = {
    message: error.message,
    locations: error.locations,
    path: error.path,
  };

  // if (
  //   error.message === EXCEPTION_MESSAGE.BAD_REQUEST_FORM_VALIDATOR &&
  //   hasIn(error, 'extensions.originalError.message')
  // ) {
  //   graphQLFormattedError.formError = error.extensions.originalError
  //     .message as typeof graphQLFormattedError.formError;
  // }

  return graphQLFormattedError;
};
