export type TaskFormType = 'Create' | 'Get';

export type TaskFormButtonsType = { submit: string; abort: string };

export const TaskFormButtons = {
  Create: {
    submit: 'Submit',
    abort: 'Back',
  },
  Get: {
    submit: 'Update',
    abort: 'Delete',
  },
};
