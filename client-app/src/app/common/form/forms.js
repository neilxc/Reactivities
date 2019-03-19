import loginForm from './setup/loginFormSetup';
import activityForm from './setup/activityFormSetup';
import registerForm from './setup/registerFormSetup';
import profileForm from './setup/profileFormSetup';
import commentForm from './setup/commentFormSetup';
import Form from './extend';

class ActivityForm extends Form {}
class LoginForm extends Form {}
class RegisterForm extends Form {}
class ProfileForm extends Form {}
class CommentForm extends Form {}

export default {
    activityForm: new ActivityForm({...activityForm.fields}, {...activityForm.hooks}),
    loginForm: new LoginForm({...loginForm.fields}, {...loginForm.hooks}),
    registerForm: new RegisterForm({...registerForm.fields}, {...registerForm.hooks}),
    profileForm: new ProfileForm({...profileForm.fields}, {...profileForm.hooks}),
    commentForm: new CommentForm({...commentForm.fields}, {...commentForm.hooks})
}