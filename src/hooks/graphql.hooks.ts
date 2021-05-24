import {
  DocumentNode,
  QueryResult,
  useMutation,
} from '@apollo/client';
import { ExecutionResult } from 'graphql/execution/execute';

interface SignInVariables {
  email: string;
  password: string;
}

export const useGraphqlMutation = (query: DocumentNode): [QueryResult, (args?: {
  variables: SignInVariables,
}) => Promise<ExecutionResult>] => {
  const [getData, { data }] = useMutation(query);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return [data, getData];
};
