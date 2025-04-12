import { Action } from 'routing-controllers';
import { Container, Service } from 'typedi';
import { Connection } from 'typeorm';
import { UnauthorizedError } from 'routing-controllers'; // If using routing-controllers

import { AuthService } from './AuthService';
import { AppDataSource } from '../database/connection';

export function authorizationChecker(): (action: Action, roles: string[]) => Promise<boolean> | boolean {
  // connection: Connection
  // const log = new Logger(__filename);

  const authService = Container.get<AuthService>(AuthService);
  return async function innerAuthorizationChecker(action: Action, roles: any): Promise<boolean> {
    // const userId = await authService.parseBasicAuthFromRequest(action.request);
    // if (userId === undefined) {
    //   log.warn('No credentials given');
    //   return false;
    // }
    // // Check the token is revocked or not
    // const checkRevoke = await authService.checkTokenExist(action.request);
    // if (!checkRevoke) {
    //   log.warn('Invalid token');
    //   return false;
    // }
    // here the userId is sent in the req.body for the other middlewares to retrieve
    // the user id wherever needed.
    // console.log(userId, 'userid mmmmmmm');
    if (roles[0] === 'customer') {
      // const cookieToken = action.request.cookies?._Trt;
      const cookieToken = action.request.cookies?._Tt;
      if (!cookieToken) {
        // log.warn('No credentials given for customer');
        // throw new UnauthorizedError('No authentication token provided.'); // 🔥 Throws 401 error
        return false;
      }
      const customer = await authService.decryptToken(cookieToken);
      if (!customer) {
        // log.warn('Invalid token (Customer)');
        throw new UnauthorizedError('Invalid token. Please log in again.');
      }

      action.request.user = await authService.validateCustomer(customer.id);
      if (action.request.user === undefined) {
        // log.warn('Invalid credentials given');
        return false;
      }
      action.request.body.userId = customer.id;
      // log.info('Successfully checked credentials');
      return true;
    }
    // if (roles[0] === 'customer') {
    //   action.request.user = await authService.validateCustomer(userId.id);
    //   console.log(action.request.user, 'action.request.user');
    //   if (action.request.user === undefined) {
    //     log.warn('Invalid credentials given');
    //     return false;
    //   }
    //   log.info('Successfully checked credentials');
    //   return true;
    // }
    const userId = await authService.parseBasicAuthFromRequest(action.request);
    if (userId === undefined) {
      // log.warn('No credentials given');
      return false;
    }
    const checkRevoke = await authService.checkTokenExist(action.request);
    if (!checkRevoke) {
      // log.warn('Invalid token');
      return false;
    } else if (roles[0] === 'vendor') {
      action.request.user = await authService.validateVendor(userId.id);
      if (action.request.user === undefined) {
        // log.warn('Invalid credentials given');
        return false;
      }

      // log.info('Successfully checked credentials');
      return true;
    } else if (roles[0] === 'vendor-unapproved') {
      action.request.user = await authService.validateUnapprovedVendor(userId.id);
      if (action.request.user === undefined) {
        // log.warn('Invalid credentials given');
        return false;
      }

      // log.info('Successfully checked credentials');
      return true;
    } else if (roles[0] === 'admin-vendor') {
      if (userId.role === 'admin') {
        action.request.user = await authService.validateUser(userId.id);
      } else if (userId.role === 'vendor') {
        action.request.user = await authService.validateVendor(userId.id);
      }
      if (action.request.user === undefined) {
        // log.warn('Invalid credentials given');
        return false;
      }
      // log.info('Successfully checked credentials');
      return true;
    } else {
      action.request.user = await authService.validateUser(userId.id);
      if (action.request.user === undefined) {
        // log.warn('Invalid credentials given');
        return false;
      }
      const routeName = roles[1];
      console.log(routeName + 'routeName');
      const userGroupId =
        action.request.user && action.request.user.userGroupId ? action.request.user.userGroupId : undefined;
      if (userGroupId) {
        const getUserGroup = await authService.validateUserGroup(userGroupId);
        if (getUserGroup) {
          if (getUserGroup.groupId === 1) {
            return true;
          } else {
            if (routeName) {
              let permissions;
              if (action.request.user.permission) {
                permissions = action.request.user.permission
                  ? JSON.parse(action.request.user.permission)
                  : {};
              } else {
                permissions = getUserGroup.permission ? JSON.parse(getUserGroup.permission) : {};
              }
              if (permissions) {
                if (!permissions[routeName]) {
                  // log.warn('Forbidden');
                  return false;
                }
              }
            }
          }
        }
      } else {
        // log.warn('Invalid group');
        return false;
      }
      // log.info('Successfully checked credentials');
      return true;
    }
  };
}
