import HomeIcon from "@/components/icons/HomeIcon";
import ClassIcon from "@/components/icons/ClassIcon";
import AssignmentIcon from "@/components/icons/AssignmentIcon";
import SettingIcon from "@/components/icons/SettingIcon";

export default [
    {
        tabName: 'home',
        routeName: 'student.home',
        icon: HomeIcon
    },
    {
        tabName: 'classes',
        routeName: 'student.class',
        icon: ClassIcon
    },
    {
        tabName: 'assignments',
        routeName: 'student.assignments',
        icon: AssignmentIcon
    },
    {
        tabName: 'settings',
        routeName: 'student.settings',
        icon: SettingIcon
    },
]
