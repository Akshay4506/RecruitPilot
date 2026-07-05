import { Role } from '../../modules/user/schemas/user.schema';

export enum Permission {
  // Workspace Config
  MANAGE_WORKSPACE = 'MANAGE_WORKSPACE',
  
  // Organization Management
  MANAGE_USERS = 'MANAGE_USERS',
  MANAGE_DEPARTMENTS = 'MANAGE_DEPARTMENTS',
  MANAGE_TEAMS = 'MANAGE_TEAMS',
  
  // Recruitment
  VIEW_JOBS = 'VIEW_JOBS',
  MANAGE_JOBS = 'MANAGE_JOBS',
  VIEW_CANDIDATES = 'VIEW_CANDIDATES',
  MANAGE_CANDIDATES = 'MANAGE_CANDIDATES',
  SCHEDULE_INTERVIEWS = 'SCHEDULE_INTERVIEWS',
  SUBMIT_FEEDBACK = 'SUBMIT_FEEDBACK',
  MANAGE_OFFERS = 'MANAGE_OFFERS',
}

export const RolePermissions: Record<Role, Permission[]> = {
  [Role.SUPER_ADMIN]: Object.values(Permission),
  [Role.COMPANY_ADMIN]: Object.values(Permission),
  [Role.RECRUITER]: [
    Permission.VIEW_JOBS,
    Permission.MANAGE_JOBS,
    Permission.VIEW_CANDIDATES,
    Permission.MANAGE_CANDIDATES,
    Permission.SCHEDULE_INTERVIEWS,
  ],
  [Role.HR]: [
    Permission.VIEW_JOBS,
    Permission.VIEW_CANDIDATES,
    Permission.MANAGE_OFFERS,
  ],
  [Role.INTERVIEWER]: [
    Permission.VIEW_JOBS,
    Permission.VIEW_CANDIDATES,
    Permission.SUBMIT_FEEDBACK,
  ],
  [Role.HIRING_MANAGER]: [
    Permission.VIEW_JOBS,
    Permission.MANAGE_JOBS,
    Permission.VIEW_CANDIDATES,
    Permission.SUBMIT_FEEDBACK,
    Permission.MANAGE_OFFERS,
  ],
};
