import HomeIcon from "@/components/icons/HomeIcon";
import ClassIcon from "@/components/icons/ClassIcon";
import StudentIcon from "@/components/icons/StudentIcon";
import AssignmentIcon from "@/components/icons/AssignmentIcon";
import SettingIcon from "@/components/icons/SettingIcon";

export default [
    {
        tabName: 'home',
        routeName: 'teacher.home',
        icon: HomeIcon
    },
    {
        tabName: 'classes',
        routeName: 'teacher.classes',
        icon: ClassIcon
    },
    {
        tabName: 'students',
        routeName: 'teacher.students',
        icon: StudentIcon
    },
    {
        tabName: 'assignments',
        routeName: 'teacher.assignments',
        icon: AssignmentIcon
    },
    {
        tabName: 'settings',
        routeName: 'teacher.settings',
        icon: SettingIcon
    },
]
