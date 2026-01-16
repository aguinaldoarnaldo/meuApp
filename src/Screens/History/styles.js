import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.white,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        gap: 10,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        gap: 8,
    },
    tabActive: {
        backgroundColor: '#F0F4F8',
    },
    tabText: {
        fontSize: 16,
        color: '#999',
        fontWeight: '600',
    },
    tabTextActive: {
        color: theme.colors.primary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    loadingContainer: {
        padding: 40,
        alignItems: 'center',
    },
    card: {
        backgroundColor: theme.colors.white,
        borderRadius: 15,
        padding: 18,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    cardHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12,
    },
    cardHeaderText: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 13,
        color: '#666',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 15,
        gap: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
        lineHeight: 20,
    },
    valorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    valorLabel: {
        fontSize: 14,
        color: '#666',
    },
    valorText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginTop: 20,
        marginBottom: 10,
    },
    emptyStateText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});
